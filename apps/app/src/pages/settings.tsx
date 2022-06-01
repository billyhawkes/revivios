import { NextPage } from "next";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Title from "../components/common/Layout/Title";
import { useAuth } from "../services/hooks/useAuth";

type FormInput = {
	name: string;
};

const Settings: NextPage = () => {
	const { user, update, logout } = useAuth();
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({ defaultValues: { name: user ? user.name : "" } });

	const handleChanges: SubmitHandler<FormInput> = async (data) => {
		await update.mutate(data);
	};

	const cancelChanges = () => {
		reset();
	};

	return (
		<>
			<Title name="Settings" />
			{user ? (
				<>
					<form className="flex flex-col" onSubmit={handleSubmit(handleChanges)}>
						<h2 className="text-xl mb-3">Account</h2>
						<label className="mt-3 mb-2 font-bold">Email</label>
						<p>{user.email}</p>
						<label className="mt-3 mb-2 font-bold">Name</label>
						<input
							className="border-lightbackground outline-none focus:border-white focus:border-opacity-10 rounded border-2 bg-background p-2"
							type="text"
							defaultValue={user.name}
							{...register("name", { required: true })}
						/>
						{isDirty && (
							<div className="flex justify-end fixed left-0 bottom-0 right-0 bg-background py-3 border-t-2 border-t-lightbackground">
								<button className="btn-ghost mr-4" onClick={cancelChanges}>
									Cancel
								</button>
								<input
									className="btn-filled mr-10 cursor-pointer"
									type="submit"
									value="Update"
								/>
							</div>
						)}
					</form>
					<button className="mt-6 btn-ghost" onClick={() => logout()}>
						Logout
					</button>
				</>
			) : (
				<p>No user</p>
			)}
		</>
	);
};

export default Settings;
