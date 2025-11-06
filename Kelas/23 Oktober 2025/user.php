<?php
    if (isset($_SESSION['email'])) {
    header("location:login.php");
    }
?>

<h1>Selamat Datang, <?php echo $_SESSION['email']?></h1>