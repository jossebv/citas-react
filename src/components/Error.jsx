function Error({mensaje}) {
    return (
        <div className="bg-red-800 rounded-md text-white mb-5 text-center p-3 uppercase font-bold">
            <p>{mensaje}</p>
        </div>
    );
}

export default Error;
