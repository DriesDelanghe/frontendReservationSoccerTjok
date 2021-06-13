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
	<?php }
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
      <span class="brand-text font-weight-light"><?php echo $site; ?></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <a href="./index.php" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Overview
              </p>
            </a>
          </li>
		  <li class="nav-item">
            <a href="./settings.php" class="nav-link active">
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
          <div class="col-lg-6">
            <?php
			  $getsettings = "SELECT * FROM settings";
			  
			  $settings = mysqli_query($conn, $getsettings);
				if (! $settings) {
					die('Kon site naam niet inladen: '.mysqli_error($conn));
				}
				while($row = mysqli_fetch_assoc($settings)) {
					$sitename = htmlspecialchars($row['sitename']);
					$active = htmlspecialchars($row['active']);
          $maxamount = htmlspecialchars($row['maxamount']);
				}
				?>
			  
			  <form role="form" action="<?php $_SERVER['PHP_SELF'];?>" method="post">
              	<div>
                	<div class="card card-primary">
                		<div class="card-body">
							<div class="form-group">
                        		<label for="sitename" class="control-label">Sitename</label>
                        		<div>
                            		<input type="text" autocomplete="off" name="sitename" value="<?php echo $sitename;?>" class="form-control"/>
                            	</div>
							</div>
                            <div class="form-group">
                            	<label for="active" class="control-label">Site Active?</label>
                            	<div>
                            		<select name="active" class="form-control">
										<?php 
											if($active == "true") {?>
												<option value="true">Ja</option>
												<option value="false">Nee</option>
											<?php }
										else { ?>
											<option value="false">Nee</option>
											<option value="true">Ja</option>
										<?php }
										?>
									</select>
                                </div>
                            </div>
                            <div class="form-group">
                              <label for="maxamount" class="control-label">Maximum toegelaten aantal</label>
                        		<div>
                            		<input type="text" autocomplete="off" name="maxamount" value="<?php echo $maxamount;?>" class="form-control"/>
                            	</div>

                            </div>			
                            <div class="box-footer">
								<button type="submit" class="btn btn-success btn-sm">Update Site</button>
                            </div>
						</div>
					</div>
				</div>
			  </form>
          </div>
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
	<?php
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$newsitename = $conn->real_escape_string($_POST['sitename']);
		$newactive = $conn->real_escape_string($_POST['active']);
    $newmaxamount = $conn->real_escape_string($_POST['maxamount']);
			
        $updatesetting = "UPDATE settings SET sitename = '$newsitename', active = '$newactive', maxamount = '$newmaxamount'";
		
		if ($conn->query($updatesetting) === true) {
            header("location: ./settings.php");
        }
        else {
            $_SESSION['message'] = "Update kon niet worden uitgevoerd.";
			header("location: ./settings.php");
        }
        mysqli_close($conn);
	}
	?>
</html>
