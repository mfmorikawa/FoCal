import Calendar from './Calendar';
import Modal from '../components/Modal';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export default function Home() {
	return (
		<>
			<div className="min-h-full">
				<header className="grid bg-white shadow p-2">
					<Modal />
					<button
						type="button"
						className="place-self-end h-20 rounded-md border border-gray-300 bg-white min-h-full w-20 px-4 py-2 font-bold text-gray-700 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					>
					</button>
				</header>
				<main>
					<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
						<Calendar />
					</div>
				</main>
			</div>
		</>
	)
}