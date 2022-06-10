type Props = {
	name: string;
};

const Title = ({ name }: Props) => {
	return (
		<>
			<h1 className="text-3xl mt-10">{name}</h1>
			<hr className="my-4 opacity-70" />
		</>
	);
};

export default Title;
