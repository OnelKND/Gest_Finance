import Link from "next/link";
import Navbar from "./components/Navbar";
import budgets from "./data";
import BudgetItem from "./components/BudgetItem";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div
        className="flex items-center justify center flex-col py-10
      w-full"
      >
        <div>
          <div className="flex flex-col">
            <h1 className="text-4xl md:5xl font-bold text-center">
              Prenez le controle <br /> de vos finances
            </h1>
            <p className="py-6 text-gray-800 text-center">
              Suivez vos budgets et vos dépenses, <br />
              facilement avec notre application de gestion financière.
            </p>
            <div className="flex justify-center items-center">
              <Link
                href={"/sign-in"}
                className="btn btn-sm md:btn-md btn-outline btn-accent"
              >
                Se connecter
              </Link>
              <Link
                href={"/sign-up"}
                className="btn btn-sm md:btn-md ml-2 btn-accent"
              >
                S&apos;inscrire
              </Link>
            </div>
            <ul className=" mt-5 grid md:grid-cols-3 gap-4 md:min-w-[1200px]"> 
                {budgets.map((budget) =>(
                    <Link href={""} key ={budget.id}>
                        <BudgetItem budget={budget} enableHover={1}></BudgetItem>
                    </Link>
                ))

                }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
