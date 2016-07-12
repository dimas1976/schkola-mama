<?php
header('Content-Type: application/json');
$imgArr = scandir('../img/gallery');
array_splice($imgArr,0,2);//entfernt "." und ".."
echo json_encode($imgArr);