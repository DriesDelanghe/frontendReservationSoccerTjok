<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <link rel="shortcut icon" href="./img/favicon.jpg" type="image/x-icon">
	<?php 
	include('../required/connection.php');
	include('../required/queries.php');
	
	$name = mysqli_query($conn, $sitename);
	if (! $name) {
		die('Kon site naam niet inladen: '.mysqli_error($conn));
	}
	while($row = mysqli_fetch_assoc($name)) {?>
		<title>Admin | <?php $site = htmlspecialchars($row['sitename']); echo $site ;?></title>
	<?php $maxamount = htmlspecialchars($row['maxamount']);}
	?>

  <link rel="stylesheet" href="./plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="./dist/css/adminlte.min.css">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">

  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="./index.php" class="nav-link">Home</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="../index.php" role="button"><i
            class="fas fa-th-large"></i></a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="./index.php" class="brand-link">
      <img src="./img/favicon.jpg" alt="tjok Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light"><?php echo $site;?></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <a href="./index.php" class="nav-link active">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Overview
              </p>
            </a>
          </li>
		  <li class="nav-item">
            <a href="./settings.php" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Instellingen
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Overview</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="./index.php">Home</a></li>
              <li class="breadcrumb-item active">Overview</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
		  <div class="row">
			  <?php 
			  
			  $date = "SELECT * FROM dates";
			  $getdate = mysqli_query($conn, $date);
			 	if (! $getdate) {
					 die('Kon data niet laden: '.mysqli_error($conn));
				 }
				 while($row1 = mysqli_fetch_assoc($getdate)) 
				 {
					$actdate = htmlspecialchars($row1['datum']);
					$id = htmlspecialchars($row1['iddates']);?>				 
				 	<div class="col-lg-3 col-6">
			  			<div class="small-box bg-info">
							<div class="inner">
							<?php $count = "SELECT COUNT(naam) 'aantal' FROM registers INNER JOIN dates on registers.dateid = dates.iddates WHERE datum = '$actdate'";
			  
			  					$counting = mysqli_query($conn, $count);
			  					if (! $counting) {
				  					die('Kon geen data vinden: '.mysqli_error($conn));
			  				}
							  while($row2 = mysqli_fetch_assoc($counting)) {?>
								<h3> <?php echo htmlspecialchars($row2['aantal']);} ?>/ <?php echo $maxamount;?></h3>
								<p><?php echo $date = htmlspecialchars($row1['datum']);?></p>
							  </div>
							  <div class="icon">
            					<i class="ion ion-bag"></i>
              				</div>
              				<a href="./list.php?id=<?php echo $id;?>" class="small-box-footer">Meer Info<i class="fas fa-arrow-circle-right"></i></a>
						</div>
					</div>
				 <?php }
			  ?>	
		  </div>
        </div>
      </div>
    </div>
    <?php include('../required/footer.php');?>
</div>
<script src="plugins/jquery/jquery.min.js"></script>
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="dist/js/adminlte.min.js"></script>
</body>
</html>