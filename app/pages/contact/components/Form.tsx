import { useForm, useFormState } from "react-hook-form"
import { contactMailer } from "mailers/contactMailer"
import { useMutation } from "blitz"
import sendEmail from "../mutations/sendEmail"
import toast from "react-hot-toast"
import { useEffect } from "react"

const Form = () => {
  const [sendEmailMutation, { isSuccess }] = useMutation(sendEmail)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { nume: "", prenume: "", email: "", mesaj: "" } })

  const onSubmit = async (data) => {
    const toastId = toast.loading("Se transmite mesajul")
    await sendEmailMutation(data).then(() => {
      toast.success("Mesajul a fost trimis cu succes", { id: toastId })
      reset(data)
    })

    console.log(data)
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ nume: "", prenume: "", email: "", mesaj: "" })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div>
            <p style={{ fontFamily: "Josefin Sans" }} className="text-3xl font-light">
              Nume
            </p>
            <input
              {...register("nume", { required: true })}
              className="border border-D838383 h-9"
            />
          </div>

          <div className="ml-5">
            <p style={{ fontFamily: "Josefin Sans" }} className=" font-light text-3xl">
              Prenume
            </p>
            <input
              {...register("prenume", { required: true })}
              className="border border-D838383 h-9"
            />
          </div>
        </div>

        <div className="mt-5">
          <p style={{ fontFamily: "Josefin Sans" }} className=" font-light text-3xl">
            E-mail
          </p>
          <input
            {...register("email", { required: true })}
            className="border border-D838383 w-full h-9"
          />
        </div>

        <div className="mt-5">
          <p style={{ fontFamily: "Josefin Sans" }} className=" font-light text-3xl">
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
            className=" font-light text-3xl bg-DEB52D py-3 w-full text-center text-white cursor-pointer"
            value={"Trimite"}
            type="submit"
          ></input>
        </div>
      </form>
    </div>
  )
}

export default Form
