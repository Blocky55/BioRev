export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  notes: string[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export const topics: Topic[] = [
  {
    id: "dna-human-genome",
    name: "DNA & Human Genome Project",
    icon: "🧬",
    notes: [
      "**Chromosomes & Karyotypes** — Humans have 23 pairs of chromosomes (46 total). A karyotype is an organised image of chromosomes arranged by size and shape, used to detect abnormalities like trisomy 21.",
      "**Mitosis vs Meiosis** — Mitosis produces 2 identical diploid daughter cells for growth/repair. Meiosis produces 4 genetically unique haploid gametes via two divisions and crossing over.",
      "**DNA Structure** — Double helix of nucleotides (sugar-phosphate backbone + nitrogenous bases: A-T, C-G). Antiparallel strands held by hydrogen bonds.",
      "**Transcription** — DNA → mRNA in the nucleus. RNA polymerase reads the template strand 3'→5', producing mRNA 5'→3'. Introns are spliced out before translation.",
      "**Translation** — mRNA → protein at ribosomes. tRNA anticodons match mRNA codons, delivering amino acids. Start codon AUG, stop codons UAA/UAG/UGA.",
      "**Alleles & Inheritance** — Alleles are variant forms of a gene. Dominant masks recessive in heterozygotes. Co-dominant alleles are both expressed (e.g. AB blood type).",
      "**Genotype vs Phenotype** — Genotype is the genetic makeup; phenotype is the observable characteristic. Phenotype = genotype + environment.",
      "**Natural Selection** — Individuals with advantageous traits survive and reproduce more, increasing the frequency of those alleles over generations.",
      "**Multifactorial Traits** — Traits influenced by multiple genes AND environmental factors (e.g. height, heart disease). Show continuous variation in populations.",
      "**Twin Studies** — Compare concordance rates between monozygotic (identical) and dizygotic (fraternal) twins to estimate heritability of traits.",
      "**Types of Mutations** — SNPs (single nucleotide polymorphisms): single base change. Frameshift: insertion/deletion alters reading frame. Chromosomal: large-scale rearrangements (deletions, duplications, inversions, translocations).",
      "**Causes of Mutations** — Spontaneous (replication errors) or induced (UV radiation, chemical mutagens, viruses). Most are neutral; some are harmful or beneficial.",
      "**Cystic Fibrosis** — Autosomal recessive disorder caused by mutations in the CFTR gene (most common: ΔF508). Thick mucus in lungs, pancreas, reproductive tract.",
      "**Trinucleotide Repeats** — Expansions of 3-base sequences (e.g. CAG in Huntington's disease). Show genetic anticipation — severity increases across generations.",
      "**Lactase Persistence SNP** — A single SNP upstream of the LCT gene keeps lactase expression active in adulthood. Classic example of recent positive selection in populations with dairy farming history.",
      "**Human Genome Project Findings** — Completed 2003. ~20,500 protein-coding genes (far fewer than expected). Humans are 99.9% genetically identical. Extensive alternative splicing increases protein diversity.",
      "**GWAS** — Genome-Wide Association Studies scan entire genomes of many people to find SNPs associated with diseases. Identified thousands of risk variants for complex diseases.",
      "**Private Genome Sequencing** — Now available commercially (~$200-1000). Raises questions about data privacy, insurance discrimination, psychological impact of risk information, and incidental findings."
    ],
    flashcards: [
      { id: "dna-1", front: "How many chromosomes do humans have?", back: "46 chromosomes (23 pairs) — 22 pairs of autosomes and 1 pair of sex chromosomes." },
      { id: "dna-2", front: "What is the key difference between mitosis and meiosis?", back: "Mitosis → 2 identical diploid cells (growth/repair). Meiosis → 4 unique haploid gametes (reproduction). Meiosis involves crossing over and two divisions." },
      { id: "dna-3", front: "What is the Central Dogma of molecular biology?", back: "DNA → (transcription) → mRNA → (translation) → Protein. Information flows from nucleic acids to proteins, not in reverse." },
      { id: "dna-4", front: "What are the base pairing rules in DNA?", back: "Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds. Cytosine (C) pairs with Guanine (G) via 3 hydrogen bonds." },
      { id: "dna-5", front: "What is a SNP?", back: "Single Nucleotide Polymorphism — a variation in a single base pair at a specific position in the genome. The most common type of genetic variation." },
      { id: "dna-6", front: "What causes Cystic Fibrosis?", back: "Mutations in the CFTR gene (most commonly ΔF508). Autosomal recessive inheritance — need two copies of the faulty allele to be affected." },
      { id: "dna-7", front: "How many protein-coding genes did the Human Genome Project find?", back: "Approximately 20,500 — far fewer than the ~100,000 originally predicted. Alternative splicing provides much of the protein diversity." },
      { id: "dna-8", front: "What percentage of DNA is identical between any two humans?", back: "99.9% — only 0.1% accounts for all human genetic variation." },
      { id: "dna-9", front: "What is genetic anticipation?", back: "A phenomenon where trinucleotide repeat disorders (e.g. Huntington's) become more severe and earlier-onset in successive generations as the repeat expands." },
      { id: "dna-10", front: "What is the lactase persistence SNP an example of?", back: "Recent positive natural selection — populations with dairy farming history evolved to keep lactase active in adulthood via a regulatory SNP near the LCT gene." },
      { id: "dna-11", front: "What is a frameshift mutation?", back: "An insertion or deletion that is NOT a multiple of 3 bases, shifting the entire reading frame downstream — usually produces a non-functional protein." },
      { id: "dna-12", front: "What is GWAS used for?", back: "Genome-Wide Association Studies scan genomes of large populations to identify SNPs statistically associated with specific diseases or traits." }
    ],
    quiz: [
      { id: "dna-q1", question: "How many pairs of autosomes do humans have?", options: ["22", "23", "44", "46"], correctIndex: 0 },
      { id: "dna-q2", question: "Which type of cell division produces haploid cells?", options: ["Mitosis", "Meiosis", "Binary fission", "Budding"], correctIndex: 1 },
      { id: "dna-q3", question: "What is the most common mutation in Cystic Fibrosis?", options: ["CAG expansion", "ΔF508", "Trisomy 21", "BRCA1 deletion"], correctIndex: 1 },
      { id: "dna-q4", question: "During transcription, RNA polymerase reads the template strand in which direction?", options: ["5' to 3'", "3' to 5'", "Both directions", "Random"], correctIndex: 1 },
      { id: "dna-q5", question: "What does GWAS stand for?", options: ["Gene-Wide Allele Study", "Genome-Wide Association Study", "Genetic Whole Analysis System", "Gene Workspace Analysis Software"], correctIndex: 1 },
      { id: "dna-q6", question: "Co-dominant alleles result in:", options: ["One allele masking the other", "Both alleles being expressed", "Neither allele being expressed", "A lethal phenotype"], correctIndex: 1 },
      { id: "dna-q7", question: "What percentage of human DNA is identical between individuals?", options: ["95%", "99%", "99.9%", "100%"], correctIndex: 2 },
      { id: "dna-q8", question: "Trinucleotide repeat disorders show genetic anticipation, meaning:", options: ["Symptoms appear at the same age each generation", "The disease skips generations", "Severity increases in successive generations", "Only males are affected"], correctIndex: 2 },
      { id: "dna-q9", question: "Which of these is NOT a type of chromosomal mutation?", options: ["Deletion", "Inversion", "SNP", "Translocation"], correctIndex: 2 },
      { id: "dna-q10", question: "The Human Genome Project found approximately how many protein-coding genes?", options: ["5,000", "20,500", "100,000", "3 million"], correctIndex: 1 }
    ]
  },
  {
    id: "development-stem-cells",
    name: "Development & Stem Cells",
    icon: "🔬",
    notes: [
      "**Human Embryonic Development** — Fertilisation → zygote → cleavage (rapid mitotic divisions) → morula (solid ball) → blastocyst (hollow ball with inner cell mass + trophoblast) → implantation (~day 6-7) → gastrulation (3 germ layers form).",
      "**Totipotent Cells** — Can become ANY cell type including extraembryonic tissues (placenta). Only the zygote and cells up to the 8-cell stage are totipotent.",
      "**Pluripotent Cells** — Can become any cell type of the body but NOT extraembryonic tissue. Found in the inner cell mass of the blastocyst. Embryonic stem cells are pluripotent.",
      "**Multipotent Cells** — Can differentiate into a limited range of related cell types. Example: haematopoietic stem cells → all blood cell types.",
      "**Unipotent Cells** — Can only produce one cell type but retain self-renewal capacity. Example: skin stem cells producing only keratinocytes.",
      "**Embryonic Stem Cells (ESCs)** — Derived from inner cell mass of blastocyst (day 5-7). Pluripotent, unlimited self-renewal. Ethical concerns because embryo is destroyed during extraction.",
      "**Adult Stem Cells** — Found in specific niches in adult tissues (bone marrow, gut, skin, brain). Generally multipotent. No embryo destruction needed. Can be autologous (from patient's own body).",
      "**Induced Pluripotent Stem Cells (iPSCs)** — Adult somatic cells reprogrammed to pluripotent state using Yamanaka factors (Oct4, Sox2, Klf4, c-Myc). Nobel Prize 2012 (Shinya Yamanaka). Avoids embryo destruction.",
      "**Stem Cell Niches** — Specialised microenvironments that maintain stem cell populations. Provide signals for self-renewal vs differentiation. Examples: bone marrow niche, intestinal crypt base.",
      "**Therapeutic Applications** — Bone marrow transplants (leukaemia), skin grafts for burns, corneal repair, potential for Parkinson's (dopaminergic neurons), type 1 diabetes (insulin-producing cells), spinal cord injury repair.",
      "**Ethical Considerations** — Embryo destruction (ESCs), moral status of embryos, consent for IVF surplus embryos, reproductive cloning fears, justice in access to therapies, iPSCs as ethical alternative.",
      "**Current Clinical Trials** — iPSC-derived retinal cells for macular degeneration, ESC-derived cardiac cells for heart failure, CAR-T cell therapy (a form of cell therapy), organoids for drug testing."
    ],
    flashcards: [
      { id: "stem-1", front: "What is the difference between totipotent and pluripotent?", back: "Totipotent can form ALL cell types including placenta (only zygote to 8-cell stage). Pluripotent can form any body cell type but NOT extraembryonic tissues." },
      { id: "stem-2", front: "What are Yamanaka factors?", back: "Oct4, Sox2, Klf4, and c-Myc — four transcription factors that reprogram adult cells into induced pluripotent stem cells (iPSCs). Won the Nobel Prize in 2012." },
      { id: "stem-3", front: "Where are embryonic stem cells derived from?", back: "The inner cell mass (ICM) of the blastocyst, approximately 5-7 days after fertilisation." },
      { id: "stem-4", front: "What is a stem cell niche?", back: "A specialised microenvironment in tissue that provides signals to maintain stem cells — regulating the balance between self-renewal and differentiation." },
      { id: "stem-5", front: "Give an example of a multipotent stem cell.", back: "Haematopoietic stem cells in bone marrow — they can differentiate into all blood cell types (red cells, white cells, platelets) but not other tissues." },
      { id: "stem-6", front: "What is the main ethical advantage of iPSCs over ESCs?", back: "iPSCs don't require embryo destruction — they're made from adult somatic cells, bypassing the ethical concerns of harvesting from embryos." },
      { id: "stem-7", front: "What happens during gastrulation?", back: "The embryo reorganises from a blastocyst into three germ layers: ectoderm (skin, nervous system), mesoderm (muscle, bone, blood), and endoderm (gut, lungs, liver)." },
      { id: "stem-8", front: "What is the blastocyst?", back: "A hollow ball of cells formed ~5 days after fertilisation, consisting of an outer trophoblast layer (becomes placenta) and an inner cell mass (becomes the embryo)." },
      { id: "stem-9", front: "Name a current therapeutic use of stem cells.", back: "Bone marrow transplants for leukaemia — haematopoietic stem cells from a donor repopulate the patient's blood-forming system after chemotherapy." },
      { id: "stem-10", front: "What does 'autologous' mean in stem cell therapy?", back: "Using the patient's own cells — reduces immune rejection risk. iPSC technology makes this possible by reprogramming a patient's own skin/blood cells." }
    ],
    quiz: [
      { id: "stem-q1", question: "Which cells are totipotent?", options: ["Inner cell mass cells", "Zygote to 8-cell stage", "Adult stem cells", "iPSCs"], correctIndex: 1 },
      { id: "stem-q2", question: "What structure does the trophoblast become?", options: ["The embryo", "The placenta", "The umbilical cord", "The yolk sac"], correctIndex: 1 },
      { id: "stem-q3", question: "Who won the Nobel Prize for iPSC discovery?", options: ["James Watson", "Shinya Yamanaka", "Francis Crick", "Ian Wilmut"], correctIndex: 1 },
      { id: "stem-q4", question: "Haematopoietic stem cells are classified as:", options: ["Totipotent", "Pluripotent", "Multipotent", "Unipotent"], correctIndex: 2 },
      { id: "stem-q5", question: "The three germ layers formed during gastrulation are:", options: ["Morula, blastula, gastrula", "Ectoderm, mesoderm, endoderm", "Epidermis, dermis, hypodermis", "Cortex, medulla, capsule"], correctIndex: 1 },
      { id: "stem-q6", question: "Which Yamanaka factor is also an oncogene?", options: ["Oct4", "Sox2", "Klf4", "c-Myc"], correctIndex: 3 },
      { id: "stem-q7", question: "The main ethical concern with ESC research is:", options: ["Cost", "Embryo destruction", "Patient consent", "Animal testing"], correctIndex: 1 },
      { id: "stem-q8", question: "Unipotent stem cells can:", options: ["Form any cell type", "Form cells of one lineage only", "Form placental tissue", "Not self-renew"], correctIndex: 1 },
      { id: "stem-q9", question: "What day does the blastocyst typically implant?", options: ["Day 1-2", "Day 3-4", "Day 6-7", "Day 14"], correctIndex: 2 },
      { id: "stem-q10", question: "iPSCs are created from:", options: ["Embryonic cells", "Adult somatic cells", "Germ cells only", "Placental tissue"], correctIndex: 1 }
    ]
  },
  {
    id: "precision-medicine",
    name: "Precision Medicine",
    icon: "🎯",
    notes: [
      "**Personalised vs Precision vs P4 Medicine** — Personalised: tailored to the individual. Precision: uses biomarkers to target treatment to subgroups. P4: Predictive, Preventive, Personalised, Participatory.",
      "**Biomarkers** — Measurable indicators of biological state or disease. Can be genetic (DNA mutations), protein-based (HER2 overexpression), or metabolic. Used for diagnosis, prognosis, and treatment selection.",
      "**Pharmacogenomics** — Study of how genes affect drug response. Variations in drug-metabolising enzymes (e.g. CYP450 family) mean people metabolise drugs at different rates — affects dosing and side effects.",
      "**Cancer & Precision Medicine** — Tumours are classified by molecular profile, not just tissue of origin. Targeted therapies attack specific molecular features (mutations, overexpressed proteins).",
      "**HER2+ Breast Cancer & Trastuzumab** — ~20% of breast cancers overexpress HER2 receptor. Trastuzumab (Herceptin) is a monoclonal antibody that blocks HER2 signalling. Companion diagnostic test required before prescribing.",
      "**BRCA1/2** — Tumour suppressor genes involved in DNA repair. Inherited mutations dramatically increase lifetime risk of breast cancer (~70%) and ovarian cancer (~45%). Guides decisions about prophylactic surgery and screening.",
      "**Companion Diagnostics** — Tests that identify whether a patient will benefit from a specific targeted therapy. Required before prescribing many cancer drugs. Example: HER2 IHC test before trastuzumab.",
      "**Liquid Biopsies** — Blood tests that detect circulating tumour DNA (ctDNA) or circulating tumour cells. Non-invasive alternative to tissue biopsies. Can monitor treatment response and detect relapse early.",
      "**Challenges** — High cost, limited access in developing countries, data privacy concerns, complexity of multigenic diseases, need for large diverse databases, over-representation of European ancestry in genomic studies.",
      "**Equity Issues** — Genomic databases biased toward European populations. Precision medicine risks widening health disparities if access is determined by wealth. Need for diverse representation in research cohorts."
    ],
    flashcards: [
      { id: "pm-1", front: "What does P4 medicine stand for?", back: "Predictive, Preventive, Personalised, and Participatory — a model where patients are active partners and care is proactive rather than reactive." },
      { id: "pm-2", front: "What is a companion diagnostic?", back: "A test performed before prescribing a targeted therapy to confirm the patient has the specific biomarker the drug targets. Example: HER2 testing before trastuzumab." },
      { id: "pm-3", front: "What is trastuzumab (Herceptin) and what does it target?", back: "A monoclonal antibody that targets the HER2 receptor, overexpressed in ~20% of breast cancers. It blocks HER2 signalling, slowing tumour growth." },
      { id: "pm-4", front: "What are BRCA1 and BRCA2?", back: "Tumour suppressor genes involved in DNA double-strand break repair. Inherited mutations increase lifetime breast cancer risk to ~70% and ovarian cancer to ~45%." },
      { id: "pm-5", front: "What is a liquid biopsy?", back: "A blood test detecting circulating tumour DNA (ctDNA) or circulating tumour cells — a non-invasive way to diagnose cancer, monitor treatment response, or detect recurrence." },
      { id: "pm-6", front: "What is pharmacogenomics?", back: "The study of how genetic variation affects drug response. Enables dose optimisation and avoidance of adverse reactions based on a patient's metaboliser status." },
      { id: "pm-7", front: "Why is ancestry bias a problem in precision medicine?", back: "Most genomic databases over-represent European ancestry, so risk predictions and targeted therapies may be less accurate or available for other populations — widening health disparities." },
      { id: "pm-8", front: "What is the difference between personalised and precision medicine?", back: "Personalised = truly individual treatment. Precision = stratifying patients into subgroups by biomarkers to select the most effective therapy for that group." },
      { id: "pm-9", front: "How does precision medicine classify cancers differently?", back: "By molecular profile (specific mutations, gene expression) rather than just tissue of origin — meaning two 'breast cancers' may be treated very differently based on their molecular subtypes." },
      { id: "pm-10", front: "What is the CYP450 enzyme family's role in pharmacogenomics?", back: "CYP450 enzymes metabolise ~75% of drugs. Genetic variants create poor, intermediate, normal, or ultra-rapid metabolisers — affecting drug efficacy and toxicity." }
    ],
    quiz: [
      { id: "pm-q1", question: "What percentage of breast cancers are HER2-positive?", options: ["5%", "10%", "20%", "50%"], correctIndex: 2 },
      { id: "pm-q2", question: "BRCA1/2 are classified as:", options: ["Oncogenes", "Tumour suppressor genes", "Proto-oncogenes", "Housekeeping genes"], correctIndex: 1 },
      { id: "pm-q3", question: "What does a liquid biopsy detect?", options: ["Tumour tissue samples", "Circulating tumour DNA in blood", "Antibodies against cancer", "White blood cell count"], correctIndex: 1 },
      { id: "pm-q4", question: "Which enzyme family is most important in pharmacogenomics?", options: ["Kinases", "CYP450", "Proteases", "Lipases"], correctIndex: 1 },
      { id: "pm-q5", question: "What is the 'P' NOT in P4 medicine?", options: ["Predictive", "Preventive", "Proactive", "Participatory"], correctIndex: 2 },
      { id: "pm-q6", question: "A companion diagnostic is performed:", options: ["After treatment ends", "Before prescribing targeted therapy", "During surgery only", "Once annually"], correctIndex: 1 },
      { id: "pm-q7", question: "The main equity concern in precision medicine is:", options: ["Too many treatments available", "Genomic database ancestry bias", "Patients refusing treatment", "Too many clinical trials"], correctIndex: 1 },
      { id: "pm-q8", question: "Trastuzumab works by:", options: ["Destroying DNA", "Blocking HER2 receptor signalling", "Boosting immune response generally", "Preventing cell division everywhere"], correctIndex: 1 }
    ]
  },
  {
    id: "human-brain",
    name: "The Human Brain",
    icon: "🧠",
    notes: [
      "**Cerebral Cortex** — Outermost layer of the brain, responsible for higher functions: thought, reasoning, language, voluntary movement, sensory processing. Divided into 4 lobes: frontal, parietal, temporal, occipital.",
      "**Cerebellum** — 'Little brain' at the back. Coordinates voluntary movement, balance, posture, and motor learning. Contains more neurons than the rest of the brain combined.",
      "**Brainstem** — Connects brain to spinal cord. Controls vital autonomic functions: breathing, heart rate, blood pressure, sleep/wake cycles. Includes midbrain, pons, and medulla oblongata.",
      "**Limbic System** — Emotional brain: includes amygdala (fear/emotion processing), hippocampus (memory formation), hypothalamus (hormones, homeostasis). Links emotion to memory and behaviour.",
      "**Neurons** — Specialised cells that transmit electrical signals. Structure: cell body (soma), dendrites (receive signals), axon (transmits signal), axon terminals (release neurotransmitters). ~86 billion in the human brain.",
      "**Synapses** — Junctions between neurons. Electrical signal triggers neurotransmitter release across the synaptic cleft. Post-synaptic receptors bind neurotransmitters, generating new electrical signals.",
      "**Key Neurotransmitters** — Serotonin (mood, sleep), Dopamine (reward, motivation, movement), Noradrenaline (alertness, fight-or-flight), GABA (inhibition, calming), Glutamate (excitation, learning).",
      "**Brain Development** — Not fully mature until ~25 years. Prefrontal cortex (decision-making, impulse control) develops last. Adolescent brain undergoes synaptic pruning and myelination.",
      "**Neuroplasticity** — Brain's ability to reorganise by forming new neural connections throughout life. Enables learning, memory, and recovery from injury. 'Neurons that fire together, wire together.'",
      "**Mental Health Disorders** — Depression, anxiety, schizophrenia, bipolar disorder, PTSD. Involve complex interactions of neurotransmitter imbalances, neural circuit dysfunction, and structural changes.",
      "**Risk Factors** — Genetic: family history, specific gene variants. Environmental: trauma, substance use, prenatal stress. Social: isolation, poverty, discrimination, adverse childhood experiences (ACEs).",
      "**Stigma** — Major barrier to seeking help. Misconceptions that mental illness is a 'choice' or 'weakness'. Anti-stigma campaigns and education are crucial for improving outcomes.",
      "**Treatments** — Pharmacological: SSRIs, antipsychotics, mood stabilisers. Psychological: CBT, DBT, psychotherapy. Emerging: transcranial magnetic stimulation (TMS), ketamine therapy, psilocybin research."
    ],
    flashcards: [
      { id: "brain-1", front: "What are the four lobes of the cerebral cortex?", back: "Frontal (decision-making, personality), Parietal (sensory processing), Temporal (hearing, memory), Occipital (vision)." },
      { id: "brain-2", front: "What does the limbic system control?", back: "Emotions, memory formation, and motivated behaviour. Key structures: amygdala (fear/emotion), hippocampus (memory), hypothalamus (hormones/homeostasis)." },
      { id: "brain-3", front: "What is neuroplasticity?", back: "The brain's lifelong ability to reorganise itself by forming new neural connections — enables learning, adaptation, and recovery from injury. 'Neurons that fire together, wire together.'" },
      { id: "brain-4", front: "When does the human brain fully mature?", back: "Around age 25. The prefrontal cortex (responsible for decision-making and impulse control) is the last region to fully develop." },
      { id: "brain-5", front: "Name 3 key neurotransmitters and their functions.", back: "Serotonin — mood and sleep regulation. Dopamine — reward, motivation, movement. GABA — inhibition and calming of neural activity." },
      { id: "brain-6", front: "What are adverse childhood experiences (ACEs)?", back: "Traumatic events in childhood (abuse, neglect, household dysfunction) that significantly increase risk of mental health disorders, addiction, and chronic disease in adulthood." },
      { id: "brain-7", front: "What does the cerebellum do?", back: "Coordinates voluntary movement, balance, posture, and motor learning. Despite its small size, it contains more neurons than the rest of the brain combined." },
      { id: "brain-8", front: "How do SSRIs work?", back: "Selective Serotonin Reuptake Inhibitors block the reabsorption of serotonin in synapses, increasing serotonin availability in the synaptic cleft — used to treat depression and anxiety." },
      { id: "brain-9", front: "What is synaptic pruning?", back: "The process during adolescence where unused neural connections are eliminated, strengthening frequently-used pathways — 'use it or lose it' principle of brain development." },
      { id: "brain-10", front: "What are the three parts of the brainstem?", back: "Midbrain (reflexes, eye movement), Pons (bridges cerebellum and cortex, sleep), Medulla oblongata (breathing, heart rate, blood pressure)." }
    ],
    quiz: [
      { id: "brain-q1", question: "Which brain region is responsible for fear processing?", options: ["Hippocampus", "Amygdala", "Cerebellum", "Prefrontal cortex"], correctIndex: 1 },
      { id: "brain-q2", question: "The prefrontal cortex is the last region to mature, reaching full development around age:", options: ["16", "18", "21", "25"], correctIndex: 3 },
      { id: "brain-q3", question: "Which neurotransmitter is primarily associated with the reward system?", options: ["Serotonin", "GABA", "Dopamine", "Acetylcholine"], correctIndex: 2 },
      { id: "brain-q4", question: "The brainstem controls:", options: ["Complex reasoning", "Vital autonomic functions", "Emotional processing", "Language production"], correctIndex: 1 },
      { id: "brain-q5", question: "Approximately how many neurons are in the human brain?", options: ["1 million", "1 billion", "86 billion", "1 trillion"], correctIndex: 2 },
      { id: "brain-q6", question: "GABA's primary function is:", options: ["Excitation", "Inhibition", "Hormone release", "Pain signalling"], correctIndex: 1 },
      { id: "brain-q7", question: "What does CBT stand for?", options: ["Cortical Brain Therapy", "Cognitive Behavioural Therapy", "Central Brainstem Treatment", "Chemical Balance Technique"], correctIndex: 1 },
      { id: "brain-q8", question: "Neuroplasticity allows the brain to:", options: ["Stop developing at birth", "Only form connections in childhood", "Reorganise and form new connections throughout life", "Replace dead neurons"], correctIndex: 2 },
      { id: "brain-q9", question: "Which is NOT a risk factor for mental health disorders?", options: ["Genetic predisposition", "Adverse childhood experiences", "High physical fitness", "Social isolation"], correctIndex: 2 },
      { id: "brain-q10", question: "The hippocampus is primarily involved in:", options: ["Motor coordination", "Memory formation", "Visual processing", "Language comprehension"], correctIndex: 1 }
    ]
  },
  {
    id: "microbes-infectious-disease",
    name: "Microbes & Infectious Disease",
    icon: "🦠",
    notes: [
      "**Bacteria** — Prokaryotes (no nucleus). Diverse shapes: cocci (spheres), bacilli (rods), spirilla (spirals). Reproduce by binary fission. Most are harmless or beneficial; pathogenic species cause disease.",
      "**Viruses** — Not technically alive. Obligate intracellular parasites — need host cell machinery to replicate. Made of nucleic acid (DNA or RNA) surrounded by protein capsid, sometimes with lipid envelope.",
      "**Fungi** — Eukaryotes with cell walls (chitin). Includes yeasts (unicellular) and moulds (multicellular). Cause superficial infections (athlete's foot) and life-threatening systemic infections in immunocompromised.",
      "**Parasites** — Organisms that live on/in a host at the host's expense. Include protozoa (malaria, toxoplasma) and helminths (tapeworms, roundworms). Major global health burden.",
      "**Koch's Postulates** — 4 criteria to prove a microbe causes a disease: 1) Found in all diseased organisms, 2) Isolated and grown in pure culture, 3) Causes disease when introduced to healthy host, 4) Re-isolated from new host.",
      "**Emerging vs Re-emerging Infections** — Emerging: newly appearing (COVID-19, Zika). Re-emerging: known diseases increasing in incidence or geographic range (tuberculosis, measles due to vaccine hesitancy).",
      "**Antibiotic Mechanisms** — Target bacterial-specific structures: cell wall synthesis (penicillins), protein synthesis (tetracyclines), DNA replication (fluoroquinolones), folate synthesis (sulfonamides), cell membrane (polymyxins).",
      "**Resistance: Impermeability** — Bacteria reduce antibiotic entry by modifying or losing outer membrane porins, preventing the drug from reaching its target.",
      "**Resistance: Efflux Pumps** — Membrane proteins that actively pump antibiotics out of the bacterial cell faster than they can accumulate to effective concentrations.",
      "**Resistance: Target Modification** — Bacteria alter the molecular target of the antibiotic (e.g., modifying ribosomal binding site) so the drug can no longer bind effectively.",
      "**Resistance: Drug Inactivation** — Bacteria produce enzymes that chemically modify or destroy the antibiotic. Classic example: β-lactamases breaking the β-lactam ring of penicillins.",
      "**Resistance: Target Bypass** — Bacteria evolve alternative metabolic pathways that bypass the inhibited step entirely, making the antibiotic irrelevant.",
      "**MRSA** — Methicillin-Resistant Staphylococcus aureus. Acquired mecA gene encoding altered penicillin-binding protein (PBP2a). Resistant to all β-lactams. Major hospital and community pathogen.",
      "**Gonorrhoea Resistance** — Neisseria gonorrhoeae has developed resistance to nearly every antibiotic used against it. Last-resort: ceftriaxone + azithromycin dual therapy. 'Superbug' gonorrhoea is a WHO priority.",
      "**Phage Therapy** — Using bacteriophages (viruses that infect bacteria) to treat bacterial infections. Highly specific, self-amplifying. Being explored as alternative to antibiotics for resistant infections.",
      "**Gut Microbiome** — ~100 trillion microorganisms in the human gut. Essential for digestion, vitamin production, immune development, and pathogen resistance. Disruption (dysbiosis) linked to many diseases.",
      "**Faecal Microbiota Transplants (FMT)** — Transferring stool from a healthy donor to a patient's gut to restore microbiome diversity. Highly effective (~90%) for recurrent C. difficile infection.",
      "**C. difficile** — Clostridium difficile: spore-forming bacterium causing severe diarrhoea and colitis. Often triggered by antibiotic use disrupting normal gut flora. Recurrence is a major problem — FMT is the best treatment.",
      "**STIs** — Syphilis (Treponema pallidum): re-emerging, rising rates especially in MSM populations. Chlamydia (Chlamydia trachomatis): most common bacterial STI in the UK, often asymptomatic, can cause infertility if untreated."
    ],
    flashcards: [
      { id: "micro-1", front: "What are Koch's Postulates?", back: "4 criteria to prove causation: 1) Microbe found in all cases, 2) Isolated in pure culture, 3) Causes disease in healthy host, 4) Re-isolated from experimentally infected host." },
      { id: "micro-2", front: "Name 5 mechanisms of antibiotic resistance.", back: "1) Impermeability (reduced entry), 2) Efflux pumps (drug pumped out), 3) Target modification (drug can't bind), 4) Drug inactivation (enzymatic destruction), 5) Target bypass (alternative pathways)." },
      { id: "micro-3", front: "What makes MRSA resistant to antibiotics?", back: "The mecA gene encodes an altered penicillin-binding protein (PBP2a) with low affinity for β-lactam antibiotics, making MRSA resistant to all penicillins and cephalosporins." },
      { id: "micro-4", front: "What is FMT and what is it used for?", back: "Faecal Microbiota Transplant — transferring healthy donor stool to a patient's gut to restore microbiome. ~90% effective for recurrent C. difficile infection." },
      { id: "micro-5", front: "Why are viruses considered 'not alive'?", back: "They cannot reproduce independently — they're obligate intracellular parasites that hijack host cell machinery. They have no metabolism, no ribosomes, and don't respond to stimuli on their own." },
      { id: "micro-6", front: "What triggers C. difficile infection?", back: "Antibiotic use disrupts normal gut flora, allowing C. difficile (which forms resistant spores) to proliferate. Produces toxins causing severe diarrhoea and pseudomembranous colitis." },
      { id: "micro-7", front: "What is phage therapy?", back: "Using bacteriophages (viruses that specifically infect bacteria) to treat bacterial infections. Advantages: highly specific, self-amplifying, can work against antibiotic-resistant bacteria." },
      { id: "micro-8", front: "Why is gonorrhoea resistance a global concern?", back: "Neisseria gonorrhoeae has developed resistance to nearly every antibiotic tried. We're down to last-resort dual therapy. If this fails, gonorrhoea could become untreatable." },
      { id: "micro-9", front: "What is the gut microbiome's role in health?", back: "~100 trillion microorganisms aiding digestion, producing vitamins (K, B12), training the immune system, and providing colonisation resistance against pathogens." },
      { id: "micro-10", front: "What is the difference between emerging and re-emerging infections?", back: "Emerging: completely new diseases (COVID-19, Zika). Re-emerging: previously controlled diseases increasing in incidence or spreading to new areas (TB, measles)." },
      { id: "micro-11", front: "What is chlamydia's main danger?", back: "Often asymptomatic (especially in women), so goes undetected. If untreated, can cause pelvic inflammatory disease and infertility. Most common bacterial STI in the UK." },
      { id: "micro-12", front: "How do β-lactamases cause antibiotic resistance?", back: "They are bacterial enzymes that hydrolyse the β-lactam ring — the core structure of penicillins and cephalosporins — destroying the antibiotic before it can inhibit cell wall synthesis." }
    ],
    quiz: [
      { id: "micro-q1", question: "Which is NOT one of Koch's Postulates?", options: ["Microbe found in all cases of disease", "Microbe must be grown in pure culture", "Disease must be treatable with antibiotics", "Microbe re-isolated from experimental host"], correctIndex: 2 },
      { id: "micro-q2", question: "Efflux pumps confer resistance by:", options: ["Destroying the antibiotic", "Pumping the drug out of the cell", "Modifying the drug target", "Preventing cell wall synthesis"], correctIndex: 1 },
      { id: "micro-q3", question: "MRSA resistance is due to:", options: ["Efflux pumps only", "The mecA gene encoding altered PBP2a", "Biofilm formation", "Capsule production"], correctIndex: 1 },
      { id: "micro-q4", question: "FMT is most effective for treating:", options: ["MRSA pneumonia", "Recurrent C. difficile infection", "Viral gastroenteritis", "Crohn's disease"], correctIndex: 1 },
      { id: "micro-q5", question: "Viruses are obligate intracellular parasites because:", options: ["They are too small to survive outside", "They need host machinery to replicate", "They lack a cell wall", "They are made only of RNA"], correctIndex: 1 },
      { id: "micro-q6", question: "What is the last-resort treatment for gonorrhoea?", options: ["Penicillin alone", "Ceftriaxone + azithromycin", "Vancomycin", "Phage therapy"], correctIndex: 1 },
      { id: "micro-q7", question: "β-lactamases confer resistance by:", options: ["Pumping out antibiotics", "Breaking the β-lactam ring", "Modifying ribosomes", "Thickening cell walls"], correctIndex: 1 },
      { id: "micro-q8", question: "The human gut microbiome contains approximately:", options: ["1 million organisms", "1 billion organisms", "100 trillion organisms", "1 quadrillion organisms"], correctIndex: 2 },
      { id: "micro-q9", question: "Chlamydia is particularly dangerous because it:", options: ["Is always fatal", "Is often asymptomatic", "Cannot be treated", "Spreads through air"], correctIndex: 1 },
      { id: "micro-q10", question: "Which is an example of an emerging infection?", options: ["Tuberculosis", "Measles", "COVID-19", "Syphilis"], correctIndex: 2 }
    ]
  },
  {
    id: "conservation-biology",
    name: "Conservation Biology",
    icon: "🌿",
    notes: [
      "**Biodiversity Definition** — The variety of life at all levels: genetic diversity (within species), species diversity (between species), and ecosystem diversity (between ecosystems). Measured by species richness and evenness.",
      "**Measuring Biodiversity** — Species richness (number of species), Simpson's Index (probability two random individuals are different species), Shannon Index (accounts for abundance and evenness). Sampling methods: quadrats, transects, mark-recapture.",
      "**Habitat Loss** — The single biggest threat to biodiversity. Caused by agriculture expansion, urbanisation, deforestation, and drainage of wetlands. Leads to habitat fragmentation — isolated populations with reduced gene flow.",
      "**Climate Change** — Alters temperature, precipitation, and seasons. Species must adapt, migrate, or face extinction. Coral bleaching, range shifts, phenological mismatches (e.g., pollinators and flowers out of sync).",
      "**Invasive Alien Species** — Non-native species introduced to ecosystems where they lack natural predators. Outcompete native species for resources. One of the top drivers of extinction globally.",
      "**Overexploitation** — Harvesting species faster than they can reproduce. Includes overfishing, illegal wildlife trade, bushmeat hunting. Driven by commercial demand and lack of enforcement.",
      "**Pollution** — Chemical (pesticides, heavy metals), nutrient (eutrophication from fertiliser runoff), plastic (microplastics in marine food webs), light and noise pollution disrupting animal behaviour.",
      "**Giant Hogweed** — Invasive plant in the UK (from Caucasus). Grows up to 5m, produces phototoxic sap causing severe burns. Outcompetes native plants. Controlled by herbicide or careful physical removal.",
      "**Other Invasive Species Examples** — Grey squirrel (outcompeting native red squirrel in UK), Japanese knotweed (damages buildings, extremely hard to eradicate), signal crayfish (displacing native white-clawed crayfish).",
      "**Rewilding** — Large-scale conservation approach: restoring natural processes and reintroducing keystone species. Examples: wolves in Yellowstone (trophic cascade), beaver reintroductions in UK, Knepp Estate rewilding project.",
      "**Conservation Strategies** — Protected areas (national parks, marine reserves), ex-situ conservation (zoos, seed banks), habitat corridors, captive breeding and reintroduction, community-based conservation, sustainable use.",
      "**International Frameworks** — Convention on Biological Diversity (CBD), CITES (trade in endangered species), IUCN Red List (threat assessment), Kunming-Montreal Global Biodiversity Framework (2022: 30x30 target — protect 30% of land and sea by 2030)."
    ],
    flashcards: [
      { id: "cons-1", front: "What are the three levels of biodiversity?", back: "1) Genetic diversity (variation within a species), 2) Species diversity (variety of species in an area), 3) Ecosystem diversity (range of different ecosystems in a region)." },
      { id: "cons-2", front: "What is the biggest threat to global biodiversity?", back: "Habitat loss — primarily from agricultural expansion, urbanisation, and deforestation. Causes habitat fragmentation, isolating populations and reducing gene flow." },
      { id: "cons-3", front: "What is the 30x30 target?", back: "From the Kunming-Montreal Global Biodiversity Framework (2022): protect 30% of the world's land and 30% of oceans by 2030. Signed by 196 countries." },
      { id: "cons-4", front: "What is rewilding?", back: "Large-scale conservation that restores natural processes — often by reintroducing keystone species. Aims to let ecosystems self-regulate rather than being actively managed." },
      { id: "cons-5", front: "How did wolf reintroduction change Yellowstone?", back: "Created a trophic cascade: wolves reduced elk overgrazing → vegetation recovered → riverbanks stabilised → beaver habitat returned → biodiversity increased across multiple trophic levels." },
      { id: "cons-6", front: "Why is giant hogweed problematic as an invasive species?", back: "Grows up to 5m tall (outcompeting native plants for light), produces phototoxic sap causing severe skin burns, and spreads rapidly along waterways. Originally from the Caucasus region." },
      { id: "cons-7", front: "What is the IUCN Red List?", back: "A comprehensive assessment of species' extinction risk. Categories range from Least Concern to Extinct. Used globally to prioritise conservation efforts." },
      { id: "cons-8", front: "What is a phenological mismatch?", back: "When climate change causes the timing of interdependent ecological events to become desynchronised — e.g., flowers blooming before pollinators emerge, or caterpillars hatching before bird chicks need food." },
      { id: "cons-9", front: "What is habitat fragmentation?", back: "The breaking of continuous habitat into smaller, isolated patches. Reduces gene flow between populations, increases edge effects, and makes small populations vulnerable to extinction." },
      { id: "cons-10", front: "What does CITES regulate?", back: "The Convention on International Trade in Endangered Species — regulates cross-border trade of wild animals and plants to ensure it doesn't threaten species survival. Covers ~38,000 species." },
      { id: "cons-11", front: "Name 3 invasive species in the UK.", back: "Grey squirrel (outcompetes red squirrel), Japanese knotweed (damages buildings, near-impossible to eradicate), Signal crayfish (displaces native white-clawed crayfish and spreads crayfish plague)." },
      { id: "cons-12", front: "What is ex-situ conservation?", back: "Conservation outside natural habitat: zoos, botanical gardens, seed banks, and captive breeding programmes. Acts as insurance against extinction and can support reintroduction." }
    ],
    quiz: [
      { id: "cons-q1", question: "The single biggest threat to biodiversity is:", options: ["Climate change", "Pollution", "Habitat loss", "Invasive species"], correctIndex: 2 },
      { id: "cons-q2", question: "The Kunming-Montreal Framework targets protecting what percentage of land and sea by 2030?", options: ["10%", "20%", "30%", "50%"], correctIndex: 2 },
      { id: "cons-q3", question: "Giant hogweed is problematic because:", options: ["It attracts invasive insects", "Its sap causes severe burns and it outcompetes natives", "It absorbs all water from soil", "It is poisonous to livestock only"], correctIndex: 1 },
      { id: "cons-q4", question: "Rewilding primarily involves:", options: ["Building wildlife enclosures", "Restoring natural processes and reintroducing keystone species", "Increasing hunting quotas", "Planting non-native trees"], correctIndex: 1 },
      { id: "cons-q5", question: "A trophic cascade is:", options: ["A type of waterfall", "Indirect effects rippling through multiple food web levels", "A disease spreading through populations", "A conservation strategy"], correctIndex: 1 },
      { id: "cons-q6", question: "Simpson's Index measures:", options: ["Number of species only", "Probability two random individuals are different species", "Total biomass", "Genetic diversity"], correctIndex: 1 },
      { id: "cons-q7", question: "Which is NOT a UK invasive species?", options: ["Grey squirrel", "Japanese knotweed", "Red fox", "Signal crayfish"], correctIndex: 2 },
      { id: "cons-q8", question: "CITES regulates:", options: ["Carbon emissions", "International trade in endangered species", "Deforestation rates", "Marine pollution"], correctIndex: 1 },
      { id: "cons-q9", question: "A phenological mismatch occurs when:", options: ["Species go extinct", "Ecological timing becomes desynchronised due to climate change", "Habitats are fragmented", "Pollution kills organisms"], correctIndex: 1 },
      { id: "cons-q10", question: "Ex-situ conservation includes:", options: ["National parks", "Marine reserves", "Seed banks and captive breeding", "Habitat corridors"], correctIndex: 2 }
    ]
  }
];
