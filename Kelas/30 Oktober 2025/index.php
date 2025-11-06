<form action="" method="post">
    <input type="number" name="tanggal" placeholder="Masukkan tanggal"></br>
    <input type="number" name="bulan" placeholder="Masukkan Bulan"></br>
    <input type="submit" name="kirim" value="Zodiak anda..."></br>
</form>
<form action="" method="post">
    Angka pertama:<br>
    <input type="number" name="a" placeholder="masukkan angka pertama"><br>
    Angka kedua:<br>
    <input type="number" name="b" placeholder="masukkan angka kedua"><br>
    
    <input type="submit" name="kirim" value="Tambah">
</form>
<?php

     if (isset($_POST["kirim"])) {
         $tanggal = $_POST["tanggal"];
         $bulan = $_POST["bulan"];
        cekZodiak($tanggal, $bulan);
    }

    if (isset ($_POST["kirim"])) {
        $a = $_POST ["a"];
        $b = $_POST ["b"];

        if ($_POST["kirim"] == "tambah")
            echo tambah($a, $b);
        else if ($_POST["kirim"] == "kurang")
            echo kurang ($a, $b);
        else if ($_POST["kirim"] == "kali")
            echo kali ($a, $b);
        else if ($_POST["kirim"] == "Bagi")
            echo bagi ($a, $b);

        echo "<br>";
    }



    // function belajar(){
        // echo 'hari ini saya belajar function';
    // }

    //memanggil function//

    // function cekTanggal($tanggal){
        
        // if ($tanggal > 0 && $tanggal < 32){
        // echo 'tanggal benar';
        // }

        // else{
        // echo'tanggal salah';
        // }
    // }  
    // cekTanggal(1);
    // cekTanggal(0);
    // cekTanggal(100);

    function cekZodiak($tanggal, $bulan) {
    if ($tanggal > 0 && $tanggal < 32 && $bulan > 0 && $bulan <13){
        if ($bulan == 1) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak Anda Capricorn';
            } else {
                echo 'zodiak anda Aquarius';
            } 
        }
        
        if ($bulan == 2) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Aquarius'; 
            } else {
                echo 'Zodiak anda Pisces';
            }
        }

        if ($bulan == 3) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Pisces';
            } else {
                echo 'Zodiak anda Aries';
            }
        }

        if ($bulan == 4) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Aries';
            } else {
                echo 'Zodiak anda Taurus';
            }
        }

        if ($bulan == 5) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Taurus';
            } else {
                echo 'Zodiak anda Gemini';
            }
        }

        if ($bulan == 6) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Gemini';
            } else {
                echo 'Zodiak anda Cancer';
            }
        }

        if ($bulan == 7) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Cancer';
            } else {
                echo 'Zodiak anda Leo';
            }
        }

        if ($bulan == 8) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Leo';
            } else {
                echo 'Zodiak anda Virgo';
            }
        }

        if ($bulan == 9) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Virgo';
            } else {
                echo 'Zodiak anda Libra';
            }
        }

        if ($bulan == 10) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Libra';
            } else {
                echo 'Zodiak anda Scorpio';
            }
        }

        if ($bulan == 11) {
            if ($tanggal > 0 && $tanggal < 20) {
                echo 'Zodiak anda Scorpio';
            } else {
                echo 'Zodiak anda Sagitarius';
            }
        }

        if ($bulan == 12) {
            if ($tanggal > 0 && $tanggal < 30) {
                echo 'Zodiak anda Capricorn';
            } 
        }

    } else {
        echo 'tanggal atau bulan salah';
    }

}

function cekBulan($bulan) {
    if ($bulan > 0 && $bulan < 13) {
        return true;
    } else {
        return false;
    }
}

cekBulan(0);

if (cekBulan(1)) {
    echo "Bulan Benar<br>";
} else {
    echo "Bulan Salah<br>";
}

function luasPersegi ($panjang,$lebar) {
    $luas = $panjang * $lebar;
    return $luas;
}

$panjang = 1;
$lebar = 1;
$tinggi = 1;

echo "Volume balok dengan lebar 12, panjang 13 dan tinggi 14 adalah: ";
echo luasPersegi($panjang,$lebar) * $tinggi;

$a = 2;
$b = 5;

function tambah ($a, $b) {
    $hasilT = $a + $b;
    return $hasilT;
}

echo "<br>";
tambah ($a, $b);

?>