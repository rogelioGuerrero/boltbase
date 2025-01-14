import { useState } from 'react';
import { Title } from 'components/Title';

export default function HomePage() {
	
	const [pageReady, setPageReady] = useState(true);
	return (
		<main id="HomePage" className="main-page">
<section className="page-section q-pa-md" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col comp-grid" >
                <Title title="Home"   titleClass="text-lg font-bold text-primary" subTitleClass="text-500"      separator={false} />
            </div>
        </div>
    </div>
</section>
<section className="page-section mb-3" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col comp-grid" >
                <div className="card  s">
                    <img src="https://picsum.photos/200/300"   style={{maxWidth:'100%'}} />
                </div>
            </div>
        </div>
    </div>
</section>
		</main>
	);
}
