import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";
import Formulario from "./components/Formulario";
import { useState, useEffect } from "react";

function App() {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) ?? [];

        setPacientes(pacientesLS);
    }, []);

    useEffect(() => {

        const pacientesLS = JSON.parse(localStorage.getItem("pacientes"))

        localStorage.setItem("pacientes", JSON.stringify(pacientes));

        return () => {
            const pacientesLSAfter = JSON.parse(localStorage.getItem('pacientes'))

            if (pacientesLSAfter !== pacientes) {
                localStorage.setItem("pacientes", JSON.stringify(pacientesLS))
            }
        }
    }, [pacientes]);

    const eliminarPaciente = (id) => {
        const pacientesActualizados = pacientes.filter(
            (paciente) => paciente.id !== id
        );
        setPacientes(pacientesActualizados);
    };

    return (
        <div className="container mx-auto mt-20">
            <Header />
            <div className="mt-12 md:flex">
                <Formulario
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
                <ListadoPacientes
                    pacientes={pacientes}
                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}
                />
            </div>
        </div>
    );
}

export default App;
