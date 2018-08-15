//llamamos al paquete mysql
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
	{ 
		host: 'localhost', 
		user: 'root',  
		password: 'root', 
		database: 'facturacion'
	}
);

//creamos un objeto para instanciar la clase
var clienteModel = {};

//obtenemos todos los clientes
clienteModel.getClientes = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM CLIENTES ORDER BY ID', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, rows);
			}
		});
	}
}

//obtenemos un cliente por su id
clienteModel.getCliente = function(id, callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM CLIENTES WHERE ID = ' + connection.escape(id);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}

//añadir un nuevo cliente
clienteModel.insertCliente = function(clienteData, callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO CLIENTES SET ?', clienteData, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				//devolvemos la última id insertada
				callback(null,{"insertId" : result.insertId});
			}
		});
	}
}

//actualizar un cliente
clienteModel.updateUser = function(userData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE CLIENTES SET username = ' + connection.escape(userData.username) + ',' +  
		'email = ' + connection.escape(userData.email) +
		'WHERE id = ' + userData.id;

		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{"msg":"success"});
			}
		});
	}
}

//eliminar un cliente pasando la id a eliminar
clienteModel.deleteUser = function(id, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM CLIENTES WHERE ID = ' + connection.escape(id);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del cliente a eliminar
			if(row)
			{
				var sql = 'DELETE FROM CLIENTES WHERE ID = ' + connection.escape(id);
				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
					}
					else
					{
						callback(null,{"msg": "El cliente fue eliminado exitosamente."});
					}
				});
			}
			else
			{
				callback(null,{"msg":"El cliente no existe registrado."});
			}
		});
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = clienteModel;