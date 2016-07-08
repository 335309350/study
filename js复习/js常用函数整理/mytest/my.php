<?php
header("Content-Type:text/html;charset=utf-8");
$name = !empty($_REQUEST['name']) ? $_REQUEST['name'] : 'daheige';
die(json_encode(array('code'=>'success','content'=>'请求成功','name'=>$name)));