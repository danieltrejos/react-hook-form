import { useForm } from "react-hook-form";

const Formulario = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Enviar datos a la consolo 
    console.log(data);
  }


  return (
    <div>
      <h1>Formulario</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid py-3">
          <div>
            <label htmlFor="">Nombre</label>
            <input
              type="text"
              {...register('nombre', {
                required: true,
                maxLength: 10,
              })}
              placeholder="Ingresar Nombre"
            />
          </div>
          {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
          {errors.nombre?.type === 'maxLength' && <p>El campo nombre es requerido</p>}

          <div>
            <label htmlFor="">Apellido</label>
            <input type="text" placeholder="Ingresar Apellido" {...register('apellido')} />
          </div>

          <div>
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Ingresar Email" {...register('email')} />
          </div>

          <div>
            <label htmlFor="">Pais</label>
            <select name="" id="" {...register('pais')}>
              <option value="">-Seleccione opción-</option>
              <option value="co">Colombia</option>
              <option value="ar">Argentina</option>
              <option value="es">España</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Contraseña</label>
            <input type="password" placeholder="*******" {...register('password')} />
          </div>
        </div>

        <div className="">
          <input type="submit" value="Enviar" />
        </div>


      </form>
    </div>
  );
};

export default Formulario;


/* Lista de validaciones
required
min
max
minLength
maxLength
pattern
validate
*/