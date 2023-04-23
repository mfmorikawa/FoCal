import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTasks().map((task: any) => {
      return db.task.create({ data: task });
    })
  );
}

seed();

function getTasks() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      title: "Road worker",
      description: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      title: "Frisbee",
      description: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      title: "Trees",
      description: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      title: "Skeletons",
      description: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      title: "Hippos",
      description: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      title: "Dinner",
      description: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      title: "Elevator",
      description: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ];
}
