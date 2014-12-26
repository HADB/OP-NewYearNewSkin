<?php
header('Content-Type:text/html; charset=utf-8');
$conn=mysql_connect('localhost:3306','sunjing','sunjing@123');
if (!$conn)
  {
  die('Could not connect: ' .mysql_error());
  }
 $csv_content = ''; 
mysql_select_db("sephora", $conn);
mysql_query("SET NAMES GBK"); 
 $result=mysql_query("select * from users"); 
 
 while($row=mysql_fetch_array($result)){
	$csv_content.=$row['id'].",";
	$csv_content.=$row['name'].",";
	$csv_content.=$row['phone'].",";
	$agename="";
	
	if($row['agerange']==1){
	$agename="18-25";
	}
	else if($row["agerange"]==2){
	$agename="26-35";
	}
	else if($row["agerange"]==3){
	$agename="36-45";
	}
	else if($row['agerange']==4){
	$agename="45+";
	}
	
	//$csv_content.=$row['agerange']."\t";
	$csv_content.=$agename.",";
	$csv_content.=$row['redpacket'].",";
	$csv_content.=$row['registeddate'];
	$csv_content .= "\n\r";
 }
 
$filename = 'test.csv';
$fp = fopen($filename,'w');
if(!$fp){
 echo "不能打开文件 $filename";
 exit;
}
if (fwrite($fp, $csv_content) === FALSE) {
        echo "不能写入到文件 $filename";
        exit;
   }
   else{
   echo "导出成功"."<html><br/><a href='$filename'>点击下载导出的csv文件</a><br/><br/><br/><span>若使用Excel打开发现中文乱码，请按照以下步骤打开：
   <br/>1、使用记事本打开CSV文件
   <br/>2、点击菜单：文件-另存为，编码方式选择ANSI
   <br/>3、保存完毕后，再用EXCEL打开
   </span></html>";
   }
fclose($fp);
die('');
?>
