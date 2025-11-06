
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="style.css" />
</head>

<style>
</style>

<body>
	<div>
		<!-- navbar -->
		<nav>
			<ol>
				<li><a href="?menu=profil">Profil</a></li>
				<li><a href="?menu=sejarah">Sejarah</a></li>
				<li><a href="?menu=jurusan">Jurusan</a></li>
				<li><a href="?menu=prestasi">Prestasi</a></li>
				<li><a href="?menu=kegiatan">Kegiatan</a></li>
				<li><a href="?menu=kontak">Kontak</a></li>
			</ol>
		</nav>

		<!-- content -->
		<section class="rapih">
			<?php
			if (isset($_GET['menu'])) {
				$isi = $_GET['menu'];

				if ($isi == "sejarah") {
					require_once("pages/sejarah.php");
				}

				if ($isi == "profil") {
					require_once("pages/profil.php");
				}

				if ($isi == "jurusan") {
					require_once("pages/jurusan.php");
				}

				if ($isi == "prestasi") {
					require_once("pages/prestasi.php");
				}
				if ($isi == "kegiatan") {
					require_once("pages/kegiatan.php");
				}
				if ($isi == "kontak") {
					require_once("pages/kontak.php");
				}
			} else {
				require_once("pages/profil.php");
			}
			?>
		</section>

		<!-- footer -->
		<footer class="rapih">
			<p style="margin-top: 10px;">
				Web ini dibuat oleh bilal
			</p>
		</footer>
	</div>
</body>

</html>
