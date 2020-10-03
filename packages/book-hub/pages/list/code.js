var books = [];
var tableShow
var tableCols = [
    ["authors", "Authors"],
    ["categories", "Categories"],
    ["date", "Release date"],
    ["publisher", "Publisher"],
    ["isbn10", "ISBN10"],
    ["isbn13", "ISBN13"],
    ["added", "Added"]
]

$(document).ready(function()
{
    $("#sort-by").on("change", sortByChange);
    $("#layout").on("change", layoutChange);
    $("#search-button").on("click", updateUI);
    $('#search-query').keyup(function(e)
    {
        if (e.keyCode == 13)
        {
            updateUI();
        }
    });
    ready();
});

function ready()
{
    $("#sort-by").val(getCookie("sort-by", "title-asc"));
    $("#layout").val(getCookie("layout", "covers"));
    tableShow = getCookie("table-show", null);
    if (tableShow == null)
    {
        tableShow = ["Title", "Authors", "Categories", "Release date"];
    }
    else{
        tableShow = JSON.parse(tableShow);
    }

    var sortByOptions = "";
    sortByOptions += `<option value="title-asc">Title ASC</option>`;
    sortByOptions += `<option value="title-desc">Title DESC</option>`;
    tableCols.forEach(col => {
        sortByOptions += `<option disabled>──────────</option>`;
        sortByOptions += `<option value="${col[0]}-asc">${col[1]} ASC</option>`;
        sortByOptions += `<option value="${col[0]}-desc">${col[1]} DESC</option>`;
        
    });
    $("#sort-by").html(sortByOptions);

    load();
}

function load()
{
    Alert.working(() =>
    {
        API.simple("book-hub", "list/all", "",
            function(result)
            {
                books = result["books"];
                updateUI();
                Alert.workingDone();
            },
            function(result)
            {
                Alert.error("Something went wrong. See console (F12) for more info.");
                console.log(result);
            }
        );
    });
}

function updateUI()
{
    var sortBy = $("#sort-by").val();
    var col = sortBy.split("-")[0];
    var asc = sortBy.split("-")[1] == "asc";

    console.log(sortBy);
    console.log(col);
    console.log(asc);

    books.sort(
        function(a, b)
        {
            if(a[col] == null ) return asc ? 1 : -1;
            if(b[col] == null ) return asc ? -1 : 1;
            if (a[col].toLowerCase() > b[col].toLowerCase()) return asc ? 1 : -1;
            if (a[col].toLowerCase() < b[col].toLowerCase()) return asc ? -1 : 1;
            return 0;
        }
    );

    var layout = $("#layout").val();
    if (layout == "table")
    {
        tableLayout();
    }
    else
    {
        coverLayout();
    }
}

function tableLayout()
{
    var options = "";
    var heads = "";
    tableCols.forEach(col => {
        options += `<option>${col[1]}</option>`;
        heads += getTableHead(col[0], col[1]);
    });

    var root = $("#root");
    root.html("");
    root.append(`
        <div class="card">
            <div>
                <select id="table-show" class="selectpicker float-right" multiple data-selected-text-format="static" title="Show" data-width="300px">
                    <option disabled>Title (always)</option>
                    ${options}
                </select>
            </div>
            <div class="card-body">
                <table id="books-table" class="table table-striped w-100 table-hover">
                    <thead>
                        <tr>
                            <th onclick="tableClickHeader('title-asc','title-desc')">Title</th>
                            ${heads}
                        </tr>
                    </thead>
                        <tbody id="books-table-body">
                    </tbody>
                </table>
            </div>
        </div>`
    );

    $('#table-show').selectpicker();
    $('#table-show').selectpicker('val', tableShow);
    $('#table-show').on('hidden.bs.select', function(e, clickedIndex, isSelected, previousValue)
    {
        tableShowChange();
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
    {
        $('#table-show').selectpicker('mobile');
    }

    var body = $("#books-table-body");
    books.forEach(book =>
    {
        if (searchMatch(book) == false)
        {
            return;
        }

        var viewUrl = `/books/view?id=${book["id"]}`;
        var title = "<td>" + book["title"] + (book["subtitle"] != null ? ` - ${book["subtitle"]}` : "") + "</td>";

        var tds = "";
        tableCols.forEach(col => {
            tds += getTableTd(col[0], col[1], book);
        });

        body.append(`
            <tr onclick="window.location='${viewUrl}';">
                ${title}
                ${tds}
            </tr>
        `);
    });
}

function getTableTd(name, filterName, book)
{
    var data = book[name] == null ? "N/A" : book[name];
    var td = `<td class="fit">${data}</td>`;
    return tableShow.includes(filterName) ? td : "";
}
function getTableHead(name, filterName)
{
    var th = `<th onclick="tableClickHeader('${name}-asc','${name}-desc')"class="fit">${filterName}</th>`;
    return tableShow.includes(filterName) ? th : "";
}

function coverLayout()
{
    var root = $("#root");
    root.html("");
    root.append(`
        <div id="books" class="row justify-content-center">

        </div>
    `);

    var container = $("#books");
    books.forEach(book =>
    {
        if (!searchMatch(book))
        {
            return;
        }

        var viewUrl = `/books/view?id=${book["id"]}`;
        var cover = `<img src="${book["cover"]}">`;
        var title = `<p class="title">${book["title"]}</p>`;
        var subtitle = book["subtitle"] != null ? `<p class="subtitle">${book["subtitle"]}</p>` : "";

        container.append(`
            <div class="book col-md-auto">
                <a href="${viewUrl}">
                ${cover}
                ${title}
                ${subtitle}
                </a>
            </div>`);
    });
}

function searchMatch(book)
{
    var cols = ["title", "authors", "categories", "date"];

    var searchQuery = $("#search-query").val();
    if (!(searchQuery === null || searchQuery.match(/^ *$/) !== null))
    {
        var match = false;
        cols.forEach(col =>
        {
            if (book[col].toLowerCase().includes(searchQuery.toLowerCase()))
            {
                match = true;
            }
        });
        return match;
    }
    return true;
}

function sortByChange()
{
    var value = $("#sort-by").val();
    setCookie("sort-by", value);
    updateUI();
}

function layoutChange()
{
    var value = $("#layout").val();
    setCookie("layout", value);
    updateUI();
}

function tableShowChange()
{
    tableShow = $('#table-show').selectpicker('val');
    setCookie("table-show", JSON.stringify(tableShow));
    updateUI();
}

function tableClickHeader(a, b)
{
    var sortBy = $("#sort-by").val();
    if (sortBy == a)
    {
        $("#sort-by").val(b);
    }
    else
    {
        $("#sort-by").val(a);
    }
    sortByChange();
}

function setCookie(name, value)
{
    var d = new Date();
    d.setTime(d.getTime() + (999 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name, defaultValue)
{
    var name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return defaultValue;
}