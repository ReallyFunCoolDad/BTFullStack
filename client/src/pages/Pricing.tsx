const servicesData = [
  {
    title: "Virus Cleaning",
    description: "Virus and Malware removal",
    price: "$100",
  },
  {
    title: "Data Transfer/Backup",
    description: "Backup your computer or transfer to another",
    price: "$100",
  },
  {
    title: "Computer Tune Up",
    description: "Remove the junk, update and improve performance",
    price: "$60",
  },
  {
    title: "Hardware Upgrade/Replacment",
    description: "Varies with part",
    price: "$60-$200",
  },
  {
    title: "Pickup Fee",
    description: "$20 for Cheshire, $30 for neighboring towns.",
    price: "$20-$30",
  },
  {
    title: "Consulting",
    description: "Expert advice and solutions for your IT challenges.",
    price: "$100 per hour",
  },
  {
    title: "Everything Else",
    description: "We'll figure it out!",
    price: "Varies",
  },
];

function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-2 m-auto mb-6">
      <h1 className="mt-3 text-3xl font-semibold text-center">Pricing</h1>
      <p className="text-lg text-sky-400">Common Services</p>
      <ul className="w-full">
        {servicesData.map((item, index) => (
          <li
            key={index}
            className="flex flex-col justify-center p-4 m-auto mb-3 sm:w-1/3 sm:p-0"
          >
            <div>
              <div className="flex justify-between ">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="font-semibold">{item.price}</p>
              </div>

              <p className="text-gray-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pricing;
