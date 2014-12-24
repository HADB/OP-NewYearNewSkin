

<?php
header('Content-Type:text/html; charset=utf-8');
$resultObj=new stdClass();
$pointObj=new stdClass();
$conn=mysql_connect('localhost:3306','sunjing','sunjing@123');
//$conn=mysql_connect('localhost:3306','yati_chris','sunjing@1234');
if (!$conn)
  {
  die('Could not connect: ' .mysql_error());
  }
$name= $_POST["name"];
$phone= $_POST["phone"];
$agerange= (int)($_POST["agerange"]);
//$point= (int)($_POST["point"]);
$point=(int)(InitRedPacket());
//
if(strlen($name) > "15" || strlen($name) == "0"){
	$resultObj->resultId='1';
	$resultObj->resultName="姓名应为5个中文字符或者15个英文字符，请重新输入";
	//die ("<script language=javascript>alert('姓名过长，请重新输入');</script>"); 
	echo json_encode($resultObj);
	die(''); 
}
 
//电话号码验证
if(strlen($phone) == "11") 
{ 
	//if(preg_match("/13[123569]{1}\d{8}|15[1235689]\d{8}|188\d{8}/",$phone)){
		if(preg_match("/^1[0-9]{10}$/",$phone)){
	} 
	else{
	$resultObj->resultId='2';
	$resultObj->resultName='手机号码格式不正确！';
	echo json_encode($resultObj);
	//die( "<script language=javascript>alert('请输入正确的电话号码！');</script>"); 
	die(''); 	
	}
}
else 
{ 
	$resultObj->resultId='3';
	$resultObj->resultName='手机号码长度不正确！';
	echo json_encode($resultObj);
	//die ("<script language=javascript>alert('手机号码长度不正确！');</script>"); 
	die(''); 
} 

if($agerange==null || $agerange==0){
	$resultObj->resultId='6';
	$resultObj->resultName='请选择年龄！';
	echo json_encode($resultObj);
	
	die(''); 
}
mysql_select_db("sephora", $conn);
mysql_query("set names utf8");
//电话号码是否已经存在的验证
$result=mysql_query("select * from users where phone='$phone' and redpacket=1"); 
if(mysql_num_rows($result)>0){
		$resultObj->resultId='4';
		$resultObj->resultName='该手机已经中过红包';
		$resultObj->point=1;
		$resultObj->name=$name;
		$resultObj->phone=$phone;
	
	echo json_encode($resultObj);
	die(''); 
}
$result1=mysql_query("select * from users where phone='$phone' and redpacket=0"); 
if(mysql_num_rows($result1)>0){
		if(mysql_query("UPDATE user SET redpacket=$point WHERE phone='$phone'")){
		$resultObj->resultId='5';
		$resultObj->resultName='该手机没中过红包';
		$resultObj->point=$point;
		$resultObj->name=$name;
		$resultObj->phone=$phone;
		echo json_encode($resultObj);
	}
	else{
	
	}
	
	die(''); 
}

if(mysql_query("INSERT INTO users values(null,'$name','$phone',$agerange,$point,now())") ){
	$resultObj->resultId='999';
	$resultObj->resultName='数据库操作成功！';
	$resultObj->point=$point;
	$resultObj->name=$name;
	$resultObj->phone=$phone;
	echo json_encode($resultObj);
	die('');  
	}
	else{
	$resultObj->resultId='-1';
	$resultObj->resultName='数据库操作错误！';
	echo json_encode($resultObj);
	//or die("Query failed : " .mysql_error());
	die(''); 
	}
function InitRedPacket(){
	$n=rand(1,100);
	if($n<=90){
	return 1;
	}
	else{
	return 0;
	}
}
	
function InitPoints(){
	$n=rand(1,100);
	if($n<=70){
	return 100;
	}
	else if($n>=71 && $n<=90){
	return 90;
	}
	else if($n>=91 && $n<=95){
	return 200;
	}
	else{
	return 400;
	}
}


?> 

