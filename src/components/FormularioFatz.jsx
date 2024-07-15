import { useForm } from "react-hook-form";

const FormularioFatz = () => {

  // Ejecucion de hooks al inicio

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm()

  console.log(errors)

  // Funcion que se ejecuta cuando se envia el formulario invicando el handlesubmit de react-hook-form
  const onSubmit = handleSubmit((data) => {
    console.log(data)

    //
    data.pais.toUpperCase()

    //Antes de enviar
    //fecthe el formulario
  })


  return (
    <>
      <h2 className="pt-3 text-3xl">Formulario del tutorial Fatz</h2>
      <div className="container">

        {/* la funcion handleSubmit utiliza un callback puede ser una funcion flecha o el llamada o una funcion que se crea */}
        <form onSubmit={onSubmit}>

          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingrese su nombre"
            {...register('nombre', {
              required: {
                value: true,
                message: 'El nombre es requerido.',
              },
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos dos caracteres.'
              },
              maxLength: {
                value: 20,
                message: 'El nombre debe tener máximo 20 caracteres.'
              },
            }
            )}
          />

          {errors.nombre && <span>{errors.nombre.message}</span>}



          <label htmlFor="correo">Correo: </label>
          <input
            type="email"
            placeholder="Ingrese su correo"
            {...register('correo', {
              required: {
                value: true,
                message: 'El correo es requerido.',
              },
              pattern: {
                value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                message: 'El correo no es válido.',
              }
            })}
          />
          {errors.correo && <span>{errors.correo.message}</span>}


          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Ingrese su password"
            {...register('password', {
              required: {
                value: true,
                message: 'El password es requerido.',
              },
              minLength: {
                value: 6,
                message: 'El password debe tener al menos 6 caracteres.',
              }
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <label htmlFor="confirmarPassword">Confirmar Password: </label>
          <input
            type="password"
            placeholder="Ingrese su password nuevamente"
            {...register('confirmarPassword', {
              required: {
                value: true,
                message: 'La confirmacion del password es requerido.',
              },
              validate: value => value === watch('password') || 'Los passwords no coinciden'
            })}
          />

          {errors.confirmarPassword && (
            <span>{errors.confirmarPassword.message}</span>
          )}

          {/* Fecha de nacimiento - Validada */}
          <label htmlFor="fechaNacimiento">Fecha de nacimiento: </label>
          <input
            type="date"
            placeholder="Ingrese su fecha de nacimiento"
            {...register('fechaNacimiento', {
              required: {
                value: true,
                message: 'La fecha de nacimiento es requerida.',
              },
              validate: (value) => {
                console.log(value)
                const fechaNacimiento = new Date(value)
                const fechaActual = new Date()
                const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                console.log(edad)
                return edad >= 18 || 'Debes ser mayor de edad'
              }
            })}
          />
          {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

          {/* Seleccionar pais */}
          <label htmlFor="pais">País</label>
          <select
            {...register('pais')}
          >
            <option value="">-Seleccione un valor-</option>
            <option value="mx">Mexico</option>
            <option value="co">Colombia</option>
            <option value="ar">Argentina</option>
            <option value="ch">Chile</option>
          </select>

          {/* Input condicional */}
          {
            watch('pais') == 'ar' && (
              <>
                <input
                  type="text"
                  placeholder="Provincia"
                  {...register('provincia', {
                    required: {
                      value: true,
                      message: 'Provincia es requerida'
                    }
                  })}
                />
                {errors.provincia && <span>{errors.provincia.message}</span>}
              </>
            )
          }

          {/* Archivo */}
          <label htmlFor="foto">Foto de perfil</label>
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0])
              setValue('fotoDelUsuario', e.target.files[0].name)
            }}
          />

          {/* Terminos */}
          <div>
            <label htmlFor="terminos">Acepto terminos y condiciones</label>
            <input
              type="checkbox"
              {...register('terminos', {
                required: {
                  value: true,
                  message: 'Debe aceptar los terminos y condiciones.',
                }
              })}
            />
          </div>
          {errors.terminos && <span>{errors.terminos.message}</span>}

          <button type="submit">Enviar</button>

          <pre>
            {JSON.stringify(watch(), null, 2)}
          </pre>

        </form>
      </div>
    </>
  );
};

export default FormularioFatz;
