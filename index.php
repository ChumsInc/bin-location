<?php
/**
 * @package Chums Inc
 * @subpackage Imprint Status
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2011, steve
 */


use chums\ui\WebUI2;
use chums\ui\CSSOptions;
use chums\user\Groups;



require_once ("autoload.inc.php");

$ui = new WebUI2([
    'contentFile' => 'body.inc.php',
    'title' => 'Bin Location',
    'requiredRoles' => [Groups::CS, Groups::PRODUCTION, Groups::SALES],
]);
$ui->addCSS('public/bin-location.css', CSSOptions::parse(['useTimestampVersion' => true]))
    ->addManifestJSON('public/js/manifest.json')
    ->render();
