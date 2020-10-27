<?php
header('Content-Type: application/json');

include_once($_SERVER['DOCUMENT_ROOT'] . "/framework.php");
Functions::collect();
Database::connect();

$password = Database::validatePOST("password");

$result = Database::query("SELECT `password` FROM `authentication`");

if (password_verify($password, $result->fetch_row()[0]))
{
    if (session_status() != PHP_SESSION_ACTIVE)
    {
        session_start();
    }
    $_SESSION["logged_in"] = true;

    Authentication::RegisterSuccess();
    $return["result"]["success"] = true;
}
else
{
    Authentication::RegisterFail(4);
    $return["result"]["success"] = false;
}
$return["status"] = "OK";

exit(json_encode($return));