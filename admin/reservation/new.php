<?php
include('../../required/connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    foreach($_POST as $key => $value) {
        echo "info '$key' has '$value'";
    }
}


?>