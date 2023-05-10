import Header from '../components/common/header/Header';

export default function Layout({ children }: any) {
  return (
    <div>
      <div className='flex flex-col'>
        <Header />
        <main className="flex flex-1">{children}</main>
      </div>
    </div>
  );
}