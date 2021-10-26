<?php
    $Fullname = $_POST['Fullname'];
    $Email = $_POST['Email'];
    $phoneNumber = $_POST['phoneNumber'];
    $district = $_POST['district'];
    $Crop = $_POST['Crop'];
    $quantity = $_POST['quantity'];
    $unit_measure = $_POST['unit_measure'];
    $price = $_POST['price'];
    //$comment = $_POST['comment'];

    //database connection
    /*$conn = new mysqli ('localhost','root','','register');
    if ($conn->connect_error) {
        die('connection failed: '.$conn->connect_error);
    } else {
        $stmt = $conn->prepare('insert into reg(Fullname,Date,location,Crop,Email) value(?,?,?,?,?)');
        $stmt->bind_param('sisss',$Fullname,$Date,$location,$Crop,$Email);
        $stmt->execute();
        echo 'registration succesfully';
        $stmt->close();
        $conn->close();
    };*/

    if (!empty($Fullname) || !empty($Email) || !empty($phoneNumber) || !empty($district) || !empty($Crop) || !empty($quantity) || !empty($unit_measure) || !empty($price)){
        $host = 'localhost';
        $dbUsername = 'root';
        $password = '';
        $dbname = 'project';
        
        $conn = new mysqli ($host, $dbUsername, $password, $dbname);
        if(mysqli_connect_error()){
            die('connect error('.mysqli_connect_error().')'.mysqli_connect_error());
        }else{
            $SELECT = "SELECT Email from farmers where Email=? Limit 1";
            $INSERT =  'insert into farmers(Fullname,Email,PhoneNumber,district,Crop,quantity,unit_measure,price) value(?,?,?,?,?,?,?,?)';

            $stmt = $conn->prepare($SELECT);
            $stmt->bind_param('s',$Email);
            $stmt->execute();
            $stmt->bind_result($Email);
            $stmt->store_result();
            $rnum = $stmt->num_rows;

            if($rnum===0){
                $stmt->close();

                $stmt = $conn->prepare($INSERT);
                $stmt->bind_param('ssissisi',$Fullname,$Email,$phoneNumber,$district,$Crop,$quantity,$unit_measure,$price);
                $stmt->execute();
                echo 'new record inserted successfully';
            }else{
                echo "someone already registered with the same email!!!";
            }
            $stmt->close();
            $conn->close(); 

        }
    }else{
        echo 'all fields are required';
        die();
    }

?>