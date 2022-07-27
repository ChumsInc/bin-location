<?php
/**
 * @package Chums Inc
 * @subpackage Imprint Status
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2011, steve
 */

require_once ("autoload.inc.php");
require_once ("access.inc.php");

enable_error_reporting(true);

$bodyPath = "apps/bin-location";
$title = "Bin Location";

$ui = new WebUI($bodyPath, $title, '', true, true);
$ui->version = "2020.06.03.1225";

$ui->AddCSS("public/bin-location.css?v={$ui->version}");
$ui->addManifest('public/js/manifest.json');
$ui->Send();
