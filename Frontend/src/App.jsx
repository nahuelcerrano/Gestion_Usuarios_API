import { useState, useEffect } from 'react';

const API_URL = "http://localhost:5052/api/usuarios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Usuario');

  const [refreshCount, setRefreshCount] = useState(0); 
  const recargarTabla = () => setRefreshCount(prev => prev + 1);

  
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
          const data = await respuesta.json();
          setUsuarios(data);
        }
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    cargarUsuarios();
  }, [refreshCount]);

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de querer eliminar este usuario?")) {
      try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        if(respuesta.ok) {
          alert("Usuario eliminado exitosamente.");
          recargarTabla();
        } else {
          alert("Hubo un error al intentar eliminar el usuario.");
        }
      } catch (error) {
        console.error("Error: ", error);
        alert("Error de conexión con la API.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoUsuario = { id: 0, nombre, email, rol }

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });

      if (respuesta.ok) {
        alert("Usuario creado con éxito.");

        setNombre('');
        setEmail('');
        setRol('Usuario');
        recargarTabla();
      } else if (respuesta.status === 400) {
        const errores = await respuesta.json();

        let mensajesError = "Errores de validación:\n";
        if(errores.errors) {
          for (let campo in errores.errors) {
            mensajesError += `- ${errores.errors[campo].join(", ")}\n`;
          }
        }
        alert(mensajesError);
      } else {
        alert("Hubo un error al crear el usuario.");
      }
    } catch (error) {
      console.error("Error de conexión: ", error);
      alert("No se pudo conectar con la API");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Gestión de Usuarios con React y .NET
        </h1>

        {/* Tarjeta del Formulario */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Agregar Nuevo Usuario</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
            <div>
              <label className="block text-gray-800 text-sm font-medium mb-1">Nombre:</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border bg-white border-gray-800 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-medium mb-1">Email:</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border bg-white border-gray-800 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-medium mb-1">Rol:</label>
              <select 
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full border text-gray-800 border-gray-800 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Usuario">Usuario</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Guardar Usuario
            </button>
          </form>
        </div>

        {/* Tarjeta de la Tabla */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Lista de Usuarios</h2>
            <button 
              onClick={recargarTabla}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded transition duration-200"
            >
              Actualizar Lista
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-2 px-4 border-b text-gray-800">{user.id}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{user.nombre}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{user.email}</td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.rol === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {/* Botón de Eliminar */}
                    <button 
                      onClick={() => eliminarUsuario(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-3 rounded transition duration-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No hay usuarios registrados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App