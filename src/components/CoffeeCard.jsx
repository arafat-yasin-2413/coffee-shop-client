import React from "react";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
	const { _id, name, price, photo, quantity } = coffee || {};

	const handleDelete = (_id) => {
		console.log(_id);

		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			console.log(result.isConfirmed);
			if (result.isConfirmed) {
				// start deleting procedure
				fetch(`http://localhost:3000/coffees/${_id}`, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						// console.log('after delete : ', data)
						if (data.deletedCount) {
							Swal.fire({
								title: "Deleted!",
								text: "Your coffee has been deleted.",
								icon: "success",
							});


                            // remove the coffee from the state
                            const remainingCoffees  = coffees.filter(cof=> cof._id !== _id);
                            setCoffees(remainingCoffees);
						}
					});
			}
		});
	};

	return (
		<div>
			<div className="card card-side bg-base-100 shadow-sm border-2 flex items-center ">
				<figure>
					<img src={photo} alt={`photo of ${name}`} />
				</figure>
				<div className="flex justify-around items-center my-12 w-full">
					<div>
						<h2>Name: {name}</h2>
						<p>Price: {price}BDT</p>
						<p>Quantity: {quantity}</p>
					</div>

					<div className="card-actions justify-end">
						<div className="join join-vertical space-y-2">
							<Link to={`/coffee/${_id}`}>
								<button className="btn join-item bg-[#D2B48C] hover:bg-gray-400 rounded">
									{" "}
									<FaEye
										className="text-white"
										size={20}
									></FaEye>{" "}
								</button>
							</Link>

							<Link to={`/updateCoffee/${_id}`}>
								<button className="btn join-item bg-[#3C393B] text-white hover:bg-gray-500 rounded">
									{" "}
									<FaPencilAlt size={20}></FaPencilAlt>{" "}
								</button>
							</Link>

							<button
								onClick={() => handleDelete(_id)}
								className="btn join-item bg-red-500 text-white hover:bg-red-400 rounded"
							>
								{" "}
								<MdDelete size={20}></MdDelete>{" "}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoffeeCard;
