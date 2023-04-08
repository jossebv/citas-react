import { useState, useEffect } from "react";
import Error from "./Error";

function Formulario({
    pacientes,
    setPacientes,
    paciente,
    setPaciente
}) {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [alta, setAlta] = useState("");
    const [sintomas, setSintomas] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setAlta(paciente.alta);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validación del formulario
        if ([nombre, propietario, email, alta, sintomas].includes("")) {
            setError(true);
        } else {
            setError(false);
            const nuevoPaciente = {
                nombre,
                propietario,
                email,
                alta,
                sintomas,
            };

            if (paciente.id) {
                nuevoPaciente.id = paciente.id;
                const pacientesActualizados = pacientes.map((elem) =>
                    elem.id === paciente.id ? nuevoPaciente : elem
                );
                setPacientes(pacientesActualizados);
                setPaciente({});
            } else {
                nuevoPaciente.id = getIdentifier();
                setPacientes(pacientes.concat(nuevoPaciente));
            }
            setNombre("");
            setPropietario("");
            setEmail("");
            setAlta("");
            setSintomas("");
        }
    };

    const getIdentifier = () =>
        Date.now().toString(36) + Math.random().toString(36).substring(2);

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y{" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl py-10 px-5 mb-10 mx-5"
            >
                {error && (
                    <Error mensaje={"Todos los campos son obligatorios"} />
                )}

                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="w-full text-gray-700 uppercase font-bold"
                    >
                        Nombre Mascota
                    </label>

                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        value={nombre}
                        onChange={(ev) => setNombre(ev.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="w-full text-gray-700 uppercase font-bold"
                    >
                        Propietario
                    </label>

                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        value={propietario}
                        onChange={(ev) => setPropietario(ev.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="w-full text-gray-700 uppercase font-bold"
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Email Contacto Propietario"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="alta"
                        className="w-full text-gray-700 uppercase font-bold"
                    >
                        Alta
                    </label>

                    <input
                        type="date"
                        id="alta"
                        value={alta}
                        onChange={(ev) => setAlta(ev.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="w-full text-gray-700 uppercase font-bold"
                    >
                        Síntomas
                    </label>

                    <textarea
                        name=""
                        id="sintomas"
                        value={sintomas}
                        onChange={(ev) => setSintomas(ev.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        placeholder="Describe los Sintomas"
                    ></textarea>
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-700 transition-all"
                    value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
                />
            </form>
        </div>
    );
}

export default Formulario;
