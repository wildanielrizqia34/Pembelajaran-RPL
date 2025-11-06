<?php
$menu = ['Profil','Kontak','Kegiatan','Jadwal'];
$img = "images/OIP.jpg";
$berita = "SMP negeri ini didirikan pertama kali pada tahun 1958.Saat sekarang SMP Negeri 2 Sidoarjo masih menggunakan program kurikulum belajar SMP 2013. SMP Negeri 2 Sidoarjo dibawah komando seorang kepala sekolah dengan nama Drs. Qodim, M.si.dibantu oleh operator bernama Supriyono.";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web SMPN 2 ROR</title>
    <link rel="stylesheet" href="bootstrap-5.3.8-dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt -3">
        <div class="bg-dark p-2 rounded">
            <ul class="nav justify-content-center">
                <li class= "nav-item"><a class="nav-link text-white" href="#"><?= $menu[0]; ?></a></li>   
                <li class= "nav-item"><a class="nav-link text-white" href="#"><?= $menu[1]; ?></a></li>   
                <li class= "nav-item"><a class="nav-link text-white" href="#"><?= $menu[2]; ?></a></li>   
            </ul>
        </div>
        <div>
            <h2>Berita</h2>
            <?= $berita; ?>
        </div>
        <div>
            <img src="<?= $img?>" alt="">
        </div>
    </div>
</body>
</html>