type ParentWithChildren = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  schoolId: string;
  profession: string;
  children: Array<{
    id: string;
    nom: string;
    prenom: string;
    dateOfBirth: string;
    abscence: number;
    retards: number;
    moyenne: number;
    classe: {
      id: string;
      nom: string;
      niveau: string;
    };
    attendances: Array<{
      id: string;
      type: "RETARD" | "ABSCENCE";
      date: string;
      discipline: {
        id: string;
        name: string;
      };
    }>;
    notes: Array<{
      id: string;
      note: number;
      coefficient: number;
      devoir: boolean;
      appreciation: string;
      type: string;
      date: string;
      discipline: {
        name: string;
      };
    }>;
  }>;
};

export function enrichChildrenWithStats(parent: ParentWithChildren) {
  if (!parent) return null;

  const childrenWithStats = parent.children.map((child) => {
    const { attendances = [], notes = [] } = child;

    // 1. Calculate average grade (weighted)
    const moyenne = calculerMoyenneFinale(notes);

    const absence = attendances.filter((a) => a.type === "ABSCENCE").length;
    const retards = attendances.filter((a) => a.type === "RETARD").length;

    return {
      ...child,
      moyenne,
      absence,
      retards,
    };
  });

  return {
    ...parent,
    children: childrenWithStats,
  };
}

type Note = {
  note: number;
  coefficient: number;
  devoir: boolean;
  discipline: {
    name: string;
  };
};

function calculerMoyenneFinale(notes: Note[]): number | null {
  if (notes.length === 0) return null;

  const matieresMap: Record<string, Note[]> = {};

  for (const note of notes) {
    const matiere = note.discipline.name;
    if (!matieresMap[matiere]) {
      matieresMap[matiere] = [];
    }
    matieresMap[matiere].push(note);
  }

  let totalPoints = 0;
  let totalCoefs = 0;

  for (const matiere in matieresMap) {
    const notesMatiere = matieresMap[matiere];
    const devoirs = notesMatiere.filter((n) => n.devoir);
    const compos = notesMatiere.filter((n) => !n.devoir);

    const moyenneDevoirs =
      devoirs.length > 0 ? devoirs.reduce((sum, n) => sum + n.note, 0) / devoirs.length : 0;

    const moyenneCompos =
      compos.length > 0 ? compos.reduce((sum, n) => sum + n.note, 0) / compos.length : 0;

    let coefMatiere: number;
    if (compos.length > 0) {
      coefMatiere = compos.reduce((sum, n) => sum + n.coefficient, 0) / compos.length;
    } else if (devoirs.length > 0) {
      coefMatiere = devoirs.reduce((sum, n) => sum + n.coefficient, 0) / devoirs.length;
    } else {
      coefMatiere = 1;
    }

    // Moyenne matière
    const moyenneMatiere = (moyenneDevoirs + moyenneCompos) / 2;

    totalPoints += moyenneMatiere * coefMatiere;
    totalCoefs += coefMatiere;
  }

  if (totalCoefs === 0) return null;

  return parseFloat((totalPoints / totalCoefs).toFixed(2));
}
