<h1>Login</h1>

<form action="" method="post">
Email:
<input type="email" name="email" placeholder="Email">
<br />
Pasword:
<input type="Pasword" name="pasword" placeholder="Email">
<br />
Submit:
<input type="Submit" name="submit" value="login">
</form>
<?php
if (isset($_POST['login'])){
$email = $_POST['email'];
$password = $_POST['password'];

if ($email == "danil@gmail.com" && $password == "1212w") {
    section_start();
    $_SESSION['email'] = $email;
    $_SESSION['pasword'] = $password;
    header ("location:index.php");
} else {
    echo "Email atau Pasword salah !";
}

}
?>