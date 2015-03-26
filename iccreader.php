<?php

$file_contents = file_get_contents('profiles/SWOP2013_and_GRACoL2013_ICC_Profiles/SWOP2013C5_ICC_Profile/SWOP2013C5.icc');
$unpacked_data = bin2hex($file_contents);

echo "<pre>";
print_r($file_contents);
echo "</pre>";

?>