import { useForm } from "react-hook-form"

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div>
            <p style={{ fontFamily: "Josefin Sans" }} className=" font-thin text-3xl">
              Nume
            </p>
            <input
              {...register("nume", { required: true })}
              className="border border-D838383 h-9"
            />
          </div>

          <div className="ml-5">
            <p style={{ fontFamily: "Josefin Sans" }} className=" font-thin text-3xl">
              Prenume
            </p>
            <input
              {...register("prenume", { required: true })}
              className="border border-D838383 h-9"
            />
          </div>
        </div>

        <div className="mt-5">
          <p style={{ fontFamily: "Josefin Sans" }} className=" font-thin text-3xl">
            E-mail
          </p>
          <input
            {...register("email", { required: true })}
            className="border border-D838383 w-full h-9"
          />
        </div>

        <div className="mt-5">
          <p style={{ fontFamily: "Josefin Sans" }} className=" font-thin text-3xl">
            Mesaj
          </p>
          <textarea
            {...register("mesaj", { required: true })}
            rows={5}
            className="border border-D838383 w-full"
          />
        </div>

        <div className="flex justify-center mt-5">
          <input
            style={{ fontFamily: "Josefin Sans" }}
            className=" font-thin text-3xl bg-DEB52D py-3 w-full text-center text-white cursor-pointer"
            value={"Trimite"}
            type="submit"
          ></input>
        </div>
      </form>
    </div>
  )
}

export default Form
