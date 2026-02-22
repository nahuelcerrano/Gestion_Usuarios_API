using System.ComponentModel.DataAnnotations;

namespace GestionUsuariosAPI.Models
{
  public class Usuario
  {
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio.")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 50 caracteres.")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email es obligatorio.")]
    [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "El rol es obligatorio")]
    public string Rol { get; set; } = "Usuario";
  }
}