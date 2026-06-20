"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function CriarUsuarioPage() {


  const router = useRouter();


  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    usuarioNome: "",
    usuarioSenha: "",
  });



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    setLoading(true);


    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/create`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify(formData),

        }
      );



      if (!response.ok) {

        toast.error(
          "Erro ao criar usuário"
        );

        return;
      }



      toast.success(
        "Usuário criado com sucesso!"
      );


      router.push("/login");


    } catch (error) {

      console.error(error);

      toast.error(
        "Erro na conexão"
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">


      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">


        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Criar conta
        </h1>



        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          <div>

            <label className="block mb-2 text-sm font-medium">
              Usuário
            </label>


            <input

              type="text"

              name="usuarioNome"

              value={formData.usuarioNome}

              onChange={handleInputChange}

              placeholder="Digite o usuário"

              className="w-full px-4 py-3 border rounded-lg"

              required

            />

          </div>



          <div>

            <label className="block mb-2 text-sm font-medium">
              Senha
            </label>


            <input

              type="password"

              name="usuarioSenha"

              value={formData.usuarioSenha}

              onChange={handleInputChange}

              placeholder="Digite a senha"

              className="w-full px-4 py-3 border rounded-lg"

              required

            />

          </div>



          <button

            type="submit"

            disabled={loading}

            className="w-full py-3 bg-secondary text-white rounded-lg"

          >

            {loading ? "Criando..." : "Criar conta"}

          </button>



          <button

            type="button"

            onClick={() => router.push("/login")}

            className="w-full py-3 bg-gray-400 text-white rounded-lg"

          >

            Voltar

          </button>


        </form>


      </div>


    </div>

  );

}