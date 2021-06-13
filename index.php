<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <link rel="shortcut icon" href="./img/favicon.jpg" type="image/x-icon">
  <?php 
	include ('./required/connection.php');
	session_start();
	$_SESSION['message'] = '';
  ?>

  <title>EK 2021 | JH Tjok Hove</title>

  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="./admin/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="./admin/dist/css/adminlte.min.css">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
	
<body>
	<div class="wrapper">
    		<div class="content-header">
      			<div class="container-fluid">
        			<div class="row mb-2">
        				<div class="col-sm-6">
         					<h1 class="m-0 text-dark">EK 2021 JH Tjok Hove</h1>
          					</div>
          					<div>
								<p>Beste Tjok bezoeker, vanwege de corona maatregelen die de veiligheidsraad heeft voorgelegd, zijn wij verplicht om uw gegevens op te vragen en deze gedurende 4 weken bij te houden voor de contacttracing. </p>
								<p>De Contacttracing is gewijzigd naar minder gegevens die wij opvragen. Er moet vanaf nu ook maar 1 persoon per tafel zich inschrijven.</p>
        					</div>
        				</div>
      				</div>
    			</div>

    			<div class="content">
					<div class="container-fluid">
						<div class="card card-default">
							<div class="card-body">
								<?php echo $_SESSION['message']; ?>
            					<div>
									<div class="form-group">
                						<form role="form" action="<?php $_SERVER['PHP_SELF'];?>" method="post">
                    						<div>
                        						<div class="card card-primary">
                            						<div class="card-body">
														<div class="form-group">
                                    						<label for="naam" class="control-label">Naam</label>
                                    						<div>
                                        						<input type="text" autocomplete="off" name="naam" placeholder="Naam" class="form-control" required/>
                                    						</div>
														</div>
                                						<div class="form-group">
                                    						<label for="voornaam" class="control-label">Voornaam</label>
                                    						<div>
                                        						<input type="text" autocomplete="off" name="voornaam" placeholder="Voornaam" class="form-control" required/>
                                    						</div>
                                						</div>
                                						<div class="form-group">
                                    						<label for="email" class="control-label">Email/Telefoon</label>
                                    						<div>
                                        						<input type="text" autocomplete="off" name="email" placeholder="Email/Telefoon" class="form-control" required/>
                                    						</div>
                                						</div>
														<div class="form-group">
                                    						<label for="tafelnummer" class="control-label">Tafelnummer</label>
                                    						<div>
                                        						<select name="tafelnummer" class="form-control">
																	<option value="1">1</option>
																	<option value="2">2</option>
																	<option value="3">3</option>
																	<option value="4">4</option>
																	<option value="5">5</option>
																	<option value="6">6</option>
																	<option value="7">7</option>
																	<option value="8">8</option>
																	<option value="9">9</option>
																	<option value="10">10</option>
																	<option value="11">11</option>
																	<option value="12">12</option>																	
																	<option value="13">13</option>
																	<option value="14">14</option>
																	<option value="15">15</option>
																	<option value="16">16</option>
																	<option value="17">17</option>
																	<option value="18">18</option>
																	<option value="19">19</option>
																	<option value="20">20</option>
																	<option value="21">21</option>
																	<option value="22">22</option>
																	<option value="23">23</option>
																	<option value="24">24</option>
																</select>
                                    						</div>
                                						</div>
                            						</div>
                        						</div>
                    						</div>
                        					</div>
                    					</div>										
                            			<div class="card-footer">
											<button type="submit" class="btn btn-success btn-sm">Check-In</button>
                            			</div>
                					</form>
            					</div>
        					</div>
						</div>
					</div>	
  				</div>
			</div>
	<footer class="center main-footer">
    	<?php include('./required/footer.php');?>
	</footer>

	<script src="./dist/js/adminlte.min.js"></script>
</body>

<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$naam = $voornaam = $email = $tafelnummer = $GDPR = "";
		if (empty($_POST['gdpr'])) {
			$_SESSION['gdprwarning'] = '<label class="alert alert-warning">U hebt geen toestemming gegeven in verbant met de GDPR. Weet dat de tappers u mogen weigeren als u niet akkoord gaat met de GDPR!</label> Klik <a href="./index.php">hier</a> om terug naar de checkin te gaan.';
			echo "<script>location.href = './warning.php';</script>";}
			else {
			$naam = $conn->real_escape_string($_POST['naam']);
       		$voornaam = $conn->real_escape_string($_POST['voornaam']);
       		$email = $conn->real_escape_string($_POST['email']);
			$GDPR = $conn->real_escape_string($_POST['gdpr']);
			$tafelnummer = $conn->real_escape_string($_POST['tafelnummer']);
			
       		$date = date("Y-m-d");
			
        	$register = "INSERT INTO registers (naam, voornaam, email, GDPR, tafelnummer, datum)" . "VALUES ('$naam', '$voornaam', '$email', '$GDPR', '$tafelnummer', '$date')";

        	if ($conn->query($register) === true) {
           		$_SESSION['message'] = "Beste $naam $voornaam, U bent succesvol geregistreerd bij JH Tjok Hove.";
				echo "<script>location.href = './success.php';</script>";
        	}
        	else {
           		$_SESSION['message'] = "Beste $naam $voornaam, er is iets fout gelopen bij het registreren. Probeer het nog eens.";
				echo "<script>location.href = './index.php';</script>";
        	}
		}
        mysqli_close($conn);
	}
?>
</html>