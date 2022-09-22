import Calendar from '../components/Calendar';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home(props: { name: string }){
  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{props.name}</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <Calendar/>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}