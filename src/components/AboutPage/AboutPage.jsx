import React from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <Card sx={{ mb: 6 , backgroundColor: 'lightgrey' }}>
          <CardContent>
            <Typography align="center" variant="h4" color="secondary">History of ThermaSolutions</Typography>
            <Typography>Cytoreductive surgery (CRS) for tumor debulking has been practiced since the 1930s and techniques continued
              to advance during subsequent decades. In the 1980s, research indicated hyperthermia plus intraperitoneal chemotherapy
              was effective to combat cancer cells after the first HIPEC ever was performed in 1979. A 47-year-old Japanese patient was treated by Dr.
              John Spratt from The University of Louisville, Kentucky in a groundbreaking event.
              Paul Sugarbaker at the Washington Cancer Institute followed with favorable survival benefits with this exciting therapy and in 1995,
              he reported a protocols for CRS + HIPEC. This treatment has become standard of care; especially since Dr. Vic Verwaal&rsquo;s
              study in 2003 showing HIPEC as a regional cancer treatment as more effective than systemic chemotherapy.
              Over the years, techniques for CRS and HIPEC have included development of the open “Coliseum”, closed, semi-closed, and laparoscopic surgical methods.
              ThermaSolutions was an active participant in the early years of the development and advancement of HIPEC.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 4, backgroundColor: 'lightgrey' }}>
          <CardContent>
            <Typography align="center" variant="h4" color="secondary">About ThermaSolutions</Typography>

            <Typography>ThermaSolutions traces a history back to 2003 with the acquisition of ViaCirq, Inc. Prior to the acquisition,
              ViaCirq had obtained the first FDA cleared device specifically designed for HIPEC in December 1999.
              The ThermoChem™ HT-1000 was the first generation of a fully integrated system specifically designed and manufactured for delivering intraperitoneal hyperthermia (IPH). Since 2003,
              ThermaSolutions has been the market leader in the development and advancement of Hyperthermic Intraperitoneal Chemotherapy (HIPEC).
              The ThermoChem™ HT-1000 device, was introduced at the 54th Annual Cancer Symposium and Exhibition meeting of the Society of Surgical Oncology Symposium in Washington,
              DC on March 16, 2001. Instrumental in the history of ThermaSolutions was the 2012 acquisition of the company by the Dutch ter Stege family (Willem and Lenie)
              as company growth has been greatly influenced by their vision and business operations. Since then,
              the ThermaSolutions product line has evolved to subsequent generations of the ThermoChem™ devices (HT-2000 and HT-2500) and a complete line of HIPEC Procedure Kits and Disposables.
              Genesis Medical Group (GMG), represented by Glenn and Gary Keeling, have been business affiliates for almost the entire history of ThermaSolutions.
              Glenn and Gary and Mark Toto of GMG have a history in HIPEC that goes back to 1999 and have provided ThermaSolutions with a large presence in the United States.
              Our close harmony with these and other dedicated experts have brought the company to where it is today; poised for a bright future.
            </Typography>
          </CardContent>
          </Card>
      </div>
    </div>
  );
}

export default AboutPage;
