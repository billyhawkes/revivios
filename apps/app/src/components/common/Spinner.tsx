import Image from "next/image";

const Spinner = () => {
	return (
		<div className="flex justify-center items-center" role="status">
			<Image width={40} height={40} src={"/spinner.svg"} alt="spinner" />
		</div>
	);
};

export default Spinner;
