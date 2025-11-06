<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <div>
            <ul>
                <li><a href="?menu=home">Home</a></li>
                <?php

                if (isset ($_SESSION['email'])) {
                ?>

                <li><a href="?menu=register">Register</a></li>
                <li><a href="?menu=login">Login</a></li>
                <?php
                } else {
                }
                ?>
                <li><a href="?menu=logout">Logout</a></li>
                <li><a href="?menu=user">User</a></li>
            </ul>
        </div>
        <div>
            
        </div>
    </div>
</body>
</html>

<?php
if (isset($_GET['menu'])) {
    $menu = $_GET['menu'];

    if ($menu == 'register'){
        require_once "register.php";
    }
    if ($menu == 'login'){
        require_once "login.php";
    }
    if ($menu == 'logout'){
        require_once "logout.php";
    }
    if ($menu == 'User'){
        require_once "user.php";
    }
    if ($menu == 'Home'){
        require_once "index.php";
    }
}
?>