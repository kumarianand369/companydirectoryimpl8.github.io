// Preloader
$(document).ready(function () {
	if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
	}
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	$('#back-to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
    getAllEmployeesTable();
});

/*----start- main Function-------*/
var currentID = 0;
$('#dataTable').on('click', 'td', function() {
	switch (this.id.slice(0, 6)) {
        // employee edit
		case "empedt":
            getAllDepartmentSelect3();
			var thisedit = (this.id).slice(6);
			getPersonnel(thisedit);
			$('#editModal').modal('show');
			$('#submitEmp').on('click', function() {
				if (!$('#getFirstName').val() || !$('#getLastName').val()) {
					$('#dataNeededModal').modal('show');
				} else {
					$('#editEmpModal').modal('show');
				}			
			});
			
			$('#saveEmpButton').on('click', function() {
				updateEmpFunc(thisedit);
			});
		break;
        //employee delete
		case "empdel":
			$('#delEmpModal').modal('show');
			var thisdel = (this.id).slice(6);
			$('#delEmpButton').on('click', function() {
				deleteEmpFunc(thisdel);
			});
		break;
        // department edit
		case "dptedt":
            getAllLocationSelect3();
			var thisedit = (this.id).slice(6);
			getDepartment(thisedit);
			$('#editDeptModal').modal('show');
			$('#submitDept').on('click', function() {
				if (!$('#getDeptName').val()) {
					$('#dataNeededModal').modal('show');
				} else {
					$('#editDeptConfirmModal').modal('show');
				}
			});
			$('#saveDeptButton').on('click', function() {
				updateDeptFunc(thisedit);
			});
		break;
        // department delete
		case "dptdel":
			var thisdel = (this.id).slice(6);
			delDeptCheck(thisdel);
		break;
        //location edit
		case "locedt":
			var thisedit = (this.id).slice(6);
			getLocation(thisedit);
			$('#editLocModal').modal('show');
			$('#submitLoc').on('click', function() {
				if (!$('#getLocName').val()) {
					$('#dataNeededModal').modal('show');
				} else {
					$('#editLocConfirmModal').modal('show');
				}
			});
			$('#saveLocButton').on('click', function() {
				updateLocFunc(thisedit);
			});
		break;
        // location delete
		case "locdel":
			var thisdel = (this.id).slice(6);
			delLocCheck(thisdel);
		break;							
	}

});

// Refresh Button
$('#refreshButton').on('click', function() {
    getAllEmployeesTable();
	clearForm();
});

$('#saveEmpOkButton').on('click', function() {
    getAllEmployeesTable();
	clearForm();
});
$('#saveDepOkButton').on('click', function() {
    getAllDepartmentTable();
	clearForm();
});
$('#saveLocOkButton').on('click', function() {
    getAllLocationTable();
	clearForm();
});


// create all 3 tables
$('#navEmployees').on('click', function() {
    getAllEmployeesTable();  
});

$('#navDepartment').on('click', function() {
    getAllDepartmentTable();
});

$('#navLocation').on('click', function() {
    getAllLocationTable();
});

// Create a table with details for all employees
    function getAllEmployeesTable() {
        $.ajax({
            url: "libs/php/getAll.php",
            type: 'POST',
            dataType: 'json',
            success: function(result) {
    
                var data = result.data;		
                $('#dataTable').html(`
                <div id="employees" class="card tab-pane fade show active">
				
				<div class="card-header bg-info text-white" >
				<a>Employee</a>
				<i class="far fa-plus-square fa-2x topnav-right" id="addScreen" data-toggle="modal" data-target="#addEmployeeModal"></i>
			   </div>
				
                <div class="card-body">
			   <table id="dataTable1" class="table table-hover table-striped table-info" data-toggle="table collapse">
			   <thead class="card-header bg-info text-white">
               <tr>
				<th>
					FirstName
				</th>
				<th>
					LastName
				</th>
				<th class="job">
					JobTitle
				</th>
				<th class="email">
					Email
				</th>
				<th class="department">
					Department
				</th>
				<th class="location">
					Location
				</th>
				<th class="edit">
                   Edit	
				</th>
				<th class="delete">
                  Delete
				</th>
			</tr>
		</thead><tbody></tbody></table>
		</div>       
        </div>`);
        data.forEach(employee => {
            $('#dataTable1').append(
                
                `<tr id="${employee.id}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td class="job">${employee.jobTitle}</td>
                <td class="email">${employee.email}</td>
                <td class="department">${employee.department}</td>
                <td class="location">${employee.location}</td>
                <td id="empedt${employee.id}"><i class="fas fa-pen"></i></td>
                <td id="empdel${employee.id}"><i class="fas fa-trash"></i></td>
                </tr>`);
        });
            },
            error: function(jqXHR, textStatus, errorThrown) {
				console.log('error');
			}
        });  
    };
// create a table with all departments
    function getAllDepartmentTable() {
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: 'POST',
            dataType: 'json',
            success: function(result) {
                
                var data = result.data;
                $('#dataTable').html(`
                <div id="department" class="card tab-pane fade show active">
                <div  class="card-header bg-info text-white">
				<a>Department</a>
					<i class="far fa-plus-square fa-2x topnav-right" id="addScreen" data-toggle="modal" data-target="#addDepartmentModal"></i>
			   </div>
				
                <div class="card-body">
                <table id="dataTable2" class="table table-hover table-striped table-info">
                <thead class="card-header bg-info text-white">
                    <tr>					
                        <th></th>
                        <th data-field="departmentName">
                            Department
                        </th>
                        <th data-field="departmentLocation">
                            Location
                        </th>
                        <th data-field="button1">
                        Edit	
                        </th>
                        <th data-field="button2">
                        Delete
                        </th>
                    </tr>
                </thead><tbody></div></div>`);
                data.forEach(department => {
                    $('#dataTable2').append(`<tr>
                       <td></td>
                        <td>${department.name}</td>
                        <td>${department.location}</td>
                        <td id="dptedt${department.id}"><i class="fas fa-pen"></i></td>
                        <td id="dptdel${department.id}"><i class="fas fa-trash"></i></td>
                    </tr>`);
                });
                $('#dataTable2').append(`</tbody></table>`);     
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('error');
            }
        }); 		 
    }; 
// create a table with all locations
function  getAllLocationTable() {
        $.ajax({
            url: "libs/php/getAllLocations.php",
            type: 'POST',
            dataType: 'json',           
            success: function(result) {
    
                var data = result.data;
                $('#dataTable').html(`
                <div id="location" class="card tab-pane fade show active">
				<div  class="card-header bg-info text-white">
				<a>Location</a>
					<i class="far fa-plus-square fa-2x topnav-right" id="addScreen" data-toggle="modal" data-target="#addLocationModal"></i>
			   </div>
  
                <div class="card-body">
                <table id="dataTable3" class="table table-hover table-striped table-info">
                <thead class="card-header bg-info text-white">
                    <tr>					
                        <th></th>
                        <th data-field="locationName">
                            Location
                        </th>
                        <th data-field="button1">
                        Edit	
                        </th>
                        <th data-field="button2">
                        Delete
                        </th>    
                    </tr>
                </thead><tbody></div><div>`);
    
                data.forEach(location => {
                    $('#dataTable3').append(`<tr>
                        <td></td>
                        <td>${location.name}</td>
                        <td id="locedt${location.id}"><i class="fas fa-pen"></i></td>
                        <td id="locdel${location.id}"><i class="fas fa-trash"></i></td>
                    </tr>`);
                });
                $('#dataTable3').append(`</tbody></table>`);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('error');
            }
        }); 		
        
    };
 /*-========End with all tables=====================--*/    

// ADD Function => For employee
// Add employee and save the empolyee detail to the database

//add employee button
$('#addEmployeeModal').on('click', function() {
    getAllDepartmentSelect2();
});

//add department button
$('#addDepartmentModal').on('click', function() {
    getAllLocationSelect2();
});

//***********************************
// Create select for all departments
function getAllDepartmentSelect2() {    
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {

            var data = result.data;
            data.forEach(department => {
                $('#departmentSelect2').append($("<option>").attr('value', department.id).text(`${department.name}`));
            });     
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    }); 		  
};
// Create a select for all locations 
function getAllLocationSelect2() {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            var data = result.data;
            data.forEach(location => {
                $('#locSelect2').append($("<option>").attr('value', location.id).text(`${location.name}`));
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    }); 		
};
//======================employee + Department + location  ==============================
//save button
$('#submitAddEmployee').on('click', function() {
	if (!$('#addFirstName').val() || !$('#addLastName').val()) {
		$('#dataNeededModal').modal('show'); //empty Model show
	} else {
		$('#addEmpModal').modal('show'); // Employee Modal show
	}
});

$('#submitAddDepartment').on('click', function() {
	if (!$('#AddDept').val()) {
		$('#dataNeededModal').modal('show'); //empty model show
	} else {
		$('#addDeptModal').modal('show'); // department model show
	}
});

$('#submitAddLocation').on('click', function() {
	if (!$('#loc').val()) {
		$('#dataNeededModal').modal('show'); //empty model show
	} else {
		$('#addLocModal').modal('show'); // location model show
	}
});
//==========[employee +department +location] function   ==========================
$('#addEmpButton').on('click', function() {
    addEmployeeFunction();
});

$('#addDeptButton').on('click', function() {
    addDepartmentFunction();
});

$('#addLocButton').on('click', function() {
    addLocationFunction();
});

//========end with function ==============================================
// Clears forms of data
function clearForm() {
	$('.textField').val("");
	$('input[type=email]').val("");
};

//========================Start function ==================================
// CREATE FUNCTIONS 
// Add an employee
function addEmployeeFunction() {
    $.ajax({
        url: "libs/php/insertEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: {
            addFirstName: $('#addFirstName').val(),
            addLastName: $('#addLastName').val(),
            addJobTitle: $('#addJobTitle').val(),
            addEmail: $('#addEmail').val(),
            departmentSelect2: $('#departmentSelect2').val()
        },
        success: function(result) {
                clearForm();
                $('#addEmpModal').modal('hide');
                $('#addEmployeeModal').modal('hide');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    }); 		 
};
// Add a department
function addDepartmentFunction() {    
    $.ajax({
        url: "libs/php/insertDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#AddDept').val(),
            locationID: $('#locSelect2').val()
        },
        success: function(result) {
			clearForm();
			$('#addDeptModal').modal('hide');    
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    }); 		 
};
// Add a location
function  addLocationFunction() {
    $.ajax({
        url: "libs/php/insertLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#loc').val(),
        },
        success: function(result) {
			clearForm();
			$('#addLocModal').modal('hide');     
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    }); 		   
};
     
//=============================end all 3 function=================================================

//EDIT Employee(Edit Employee Information)->department dropdown form
function getAllDepartmentSelect3() {
	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'POST',
		dataType: 'json',
		success: function(result) {

			var data = result.data;
			$('#getEmployeeDepartment').html('<select class="form-control" id="deptSelect3"></select>');
			data.forEach(department => {
				$('#deptSelect3').append($("<option>").attr('value', department.id).text(`${department.name}`));
			});
			$('#deptSelect3').change(function() {
				var currentValue = $('#deptSelect3').val();
				getDepartment2(currentValue);
			});	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
// Edit -> Department(Edit Department Information) ->Location dropdown
function getAllLocationSelect3() {
	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;
			$('#getDepartmenttLocation').html('<select class="form-control" id="locSelect3"></select>');
			data.forEach(location => {
				$('#locSelect3').append($("<option>").attr('value', location.id).text(`${location.name}`));
			});	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
//============EDIT=====================
//EDIT -> Selected Employee Information=>(Edit Employee Information)=>all input data will be show
function getPersonnel(id) {
	currentID = id;
	$.ajax({
		url: "libs/php/getPersonnel.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result) {

			var data = result.data;
			$('#getFirstName').val(data.personnel[0].firstName);
			$('#getLastName').val(data.personnel[0].lastName);
			$('#getJobTitle').val(data.personnel[0].jobTitle);
			$('#getEmail').val(data.personnel[0].email);
			$('#deptSelect3').val(data.personnel[0].departmentID).change();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 			
};
// Edit-> selected department information=>(Edit Department Information)=>all input data be show
function getDepartment(id) {
	currentID = id;
	$.ajax({
		url: "libs/php/getDepartmentByID.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result) {
			var data = result.data[0];
			$('#getDeptName').val(data.name);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 			
};
//(Edit Employee Information)=> location input form
function getDepartment2(id) {
	$.ajax({
		url: "libs/php/getDepartmentByID.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result) {

			var data = result.data[0];
			$('#getEmpLoc').val(data.location);	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
// Edit-> selected location information=>(Edit Location Information)=>all input data be show
function getLocation(id) {
	currentID = id;
	$.ajax({
		url: "libs/php/getLocationByID.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result) {

			var data = result.data[0];
			$('#getLocName').val(data.name);	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};

// UPDATE FUNCTIONS
// Update employee information
function updateEmpFunc(id) {
	$.ajax({
		url: "libs/php/updateEmployee.php",
		type: 'POST',
		dataType: 'json',
		data: {
			firstName: $('#getFirstName').val(),
			lastName: $('#getLastName').val(),
			jobTitle: $('#getJobTitle').val(),
			email: $('#getEmail').val(),
			departmentID: $('#deptSelect3').val(),
			id: currentID
		},
		success: function(result) {
			   $('#editEmpModal').modal('hide');
				$('#editModal').modal('hide');
                getAllEmployeesTable();
                clearForm();	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
// Update department information
function updateDeptFunc() {
	$.ajax({
		url: "libs/php/updateDepartment.php",
		type: 'POST',
		dataType: 'json',
		data: {
			name: $('#getDeptName').val(),
			locationID: $('#locSelect3').val(),
			id: currentID
		},
		success: function(result) {
               $('#editDeptModal').modal('hide');
				$('#editDeptConfirmModal').modal('hide');
                getAllDepartmentTable();
				clearForm();	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
// Update location information
function updateLocFunc(id) {
	$.ajax({
		url: "libs/php/updateLocation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			name: $('#getLocName').val(),
			id: currentID
		},
		success: function(result) {
                $('#editLocModal').modal('hide');
				$('#editLocConfirmModal').modal('hide');
                getAllLocationTable();
				clearForm();	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
// DELETE FUNCTIONS
// Delete employee information
function deleteEmpFunc(id) {
	$.ajax({
		url: "libs/php/deleteEmployee.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result) {
			getAllEmployeesTable();
			$('#delEmpModal').modal('hide');
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
// Confirm department can be safely deleted
function delDeptCheck(id) {
	$.ajax({
		url: "libs/php/countDepartments.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result) {
			var data = result.data[0].totalPeople;
			if (data === "0") {
				$('#delDeptModal').modal('show');
				$('#delDeptButton').on('click', function() {
					deleteDeptFunc(id);
				});
			} else {
				$('#cannotDeleteDepartmentModal').modal('show');
			}		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};

// Delete department information
function deleteDeptFunc(id) {
	$.ajax({
		url: "libs/php/deleteDepartment.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result) {
            getAllDepartmentTable();
			$('#delDeptModal').modal('hide');				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 			
};
// confirm location can be safely deleted
function delLocCheck(id) {
	$.ajax({
		url: "libs/php/countLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},		
		success: function(result) {

			var data = result.data[0].totalDepts;
			if (data === "0") {
				$('#delLocModal').modal('show');
				$('#delLocButton').on('click', function() {
					deleteLocFunc(id);
				});
			} else {
				$('#cannotDeleteLocationModal').modal('show');
			}				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
// Delete location information
function deleteLocFunc(id) {
	$.ajax({
		url: "libs/php/deleteLocation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},	
		success: function(result) {
            getAllLocationTable();
			$('#delLocModal').modal('hide');		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
};
