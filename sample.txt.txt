
<?php include('meta_tages.php');?>
<body>
<div id="panelwrap">
  	<?php include_once("dbconnect.php");?>
	<div class="header">
		<!--Header Start -->
		<?php include_once('admin_header.php');?>	
		
  
	<main class="app-content">

      <div class="row">
        <div class="col-md-12">
          <div class="tile">
           
            <div class="tile-body">
    <img src="images/images1.jpg" width="100%" >
            </div>
           
          </div>
        </div>
        
       
    </main>
    <!-- Essential javascripts for application to work-->
<?php include('script.php');?>
    <div class="sidebar" id="sidebar">
	<!--Side Bar Start -->
   <?php 
   include_once('admin_side_bar.php');
   
   ?>
         
  <!--Side Bar End -->
    </div>
    <div class="clear"></div>
    </div> <!--end of center_content-->
        <?php include_once('admin_footer.php');?>

</div>

    	
</body>
</html>

