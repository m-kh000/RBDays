import { ConfettiButton } from "@/components/magicui/confetti";
import "./Person.css";

type PersonProps = {
  name: string | null;
  bday: string | null;
  pic: string | null;
  withbd?: boolean;
};

export default function Person({ name, bday, pic, withbd }: PersonProps) {
  return (
    <ConfettiButton
        options={{
        particleCount: 150,
        startVelocity: 70, 
        decay: 0.9, 
        spread: 90,
        scalar: 1.2,  
        gravity: 2, 
        ticks: 200, 
      }}
      className="person-card"
    >
      <div className="ppdiv">
        <img src={pic ?? ''} alt="profile picture" className="pp" />
      </div>
      <h2 className="person-name">{name}</h2>
      {withbd && <p className="person-bday">{bday}</p>}
    </ConfettiButton>
  );
}
