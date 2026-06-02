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
  // ─────────────────────────────────────────────
  // TOPIC 1 — DNA & Human Genome Project
  // ─────────────────────────────────────────────
  {
    id: "dna-human-genome",
    name: "DNA & Human Genome Project",
    icon: "🧬",
    notes: [
      // Part A
      "**Chromosomes & Karyotypes** — Humans have 46 chromosomes (23 pairs): 22 pairs of autosomes and 1 pair of sex chromosomes. A karyotype shows these 23 pairs arranged by size and shape when a cell begins dividing — used to detect abnormalities like trisomy 21.",
      "**DNA Structure** — DNA is the hereditary material. Each chromosome is one tightly packed DNA molecule. DNA is a double helix with two antiparallel strands held by hydrogen bonds between base pairs: A-T (2 H-bonds) and C-G (3 H-bonds).",
      "**Semi-conservative Replication** — Before dividing, a cell duplicates each DNA molecule. Each strand serves as a template; the new molecule has one original and one new strand. Base-pair complementarity ensures an accurate copy.",
      "**Mitosis vs Meiosis** — Mitosis is cell duplication: makes an exact copy of all 46 chromosomes, passed to two identical daughter cells (growth & repair). Meiosis forms gametes: each gamete has only 23 chromosomes (one from each pair). Meiosis involves crossing over, producing genetically unique cells.",
      "**Transcription & Translation** — Genes code for proteins. Transcription produces mRNA from DNA in the nucleus (RNA polymerase reads template strand 3'→5'). Translation produces protein from mRNA at ribosomes. Uracil replaces thymine in RNA. The 'restaurant analogy': genome = menu, RNA = orders, proteins = dishes.",
      "**Alleles & Polymorphisms** — An allele is any of several forms of a gene, arising through mutation. Polymorphism = existence of several alleles at one gene locus. Individuals have two alleles per locus (one from each parent) — homozygous (same) or heterozygous (different).",
      "**Dominant, Recessive & Co-dominant** — Dominant allele masks the other (one copy sufficient). Recessive allele needs two copies for expression. Co-dominant alleles are both expressed simultaneously (e.g. AB blood group). These relationships reflect the relative characteristics or abundance of the proteins they encode.",
      "**Genotype vs Phenotype** — Genotype = the genetic makeup (combination of alleles). Phenotype = observable characteristics (morphology, physiology, behaviour). Phenotype is controlled by one or more proteins (genotype) and sometimes the environment, which can switch genes ON or OFF.",
      "**Natural Selection & Genetic Fitness** — Allele frequency is linked to genetic fitness = reproductive success (survival to reproductive age + mating success + healthy offspring). Advantageous alleles persist or become more common; if the environment changes, frequencies shift (micro-evolution).",
      "**Beneficial Mutation Examples** — TAS2R38: reduced bitter taste receptor, allowed eating previously bitter vegetables. Lactase persistence: maintained lactase production into adulthood, fitted with cattle farming ~10,000 years ago. Sickle cell: heterozygous carriers protected from malaria. CCR5 mutation: homozygotes immune to HIV (may have previously protected against plague/smallpox).",
      "**Environment & Phenotype** — Environment can directly affect phenotype. Temperature-sensitive alleles: Siamese cats have tyrosinase inactive at higher temperatures, so melanin only produced in cool extremities. Diet: flamingo pink colouration depends on dietary carotene.",
      "**Multifactorial Traits** — Most phenotypes are due to several genes plus the environment (e.g. skin colour, height, weight, intelligence, behaviour). These exist on a continuum of variation.",
      "**Twin Studies** — Identical (monozygotic) twins share 100% of DNA; fraternal (dizygotic) share ~50%. Greater similarity in identical twins suggests genetic involvement. Less than 100% concordance in identical twins indicates environmental influence.",
      // Part B
      "**Types of Mutation** — A mutation is a permanent DNA alteration passed to daughter cells. Germline (hereditary): inherited from parent, present in every cell. Somatic (acquired): occurs during life, present only in affected cell lineage.",
      "**Causes of Mutations** — Environmental mutagens (e.g. UV radiation causing breaks or intercalation). Biological factors (viruses integrating into the genome). Errors during DNA replication, DNA repair, or meiosis (e.g. incorrect chromosome separation → trisomy 21).",
      "**Macro Mutations (Chromosomal)** — Numerical aberrations: extra chromosomes (Down syndrome = trisomy 21; Klinefelter = XXY). Structural aberrations: deletions (Cri du chat = deletion on chromosome 5). Occur during meiosis or in late-stage cancer.",
      "**Micro Mutations — SNPs** — Single Nucleotide Polymorphism (SNP, 'snip') = single base substitution. Can produce: silent mutations (no amino acid change), nonsense mutations (early STOP codon), or missense mutations (wrong amino acid). The third letter of a codon is less discriminating (wobble position).",
      "**Micro Mutations — Frameshift** — Insertions and deletions cause frameshift mutations unless the number of bases is a multiple of 3. Frameshifts usually produce an early STOP codon → shorter or absent protein → usually very harmful.",
      "**Mutation Location Matters** — Mutations in exons directly affect the protein. Mutations in promoters or enhancers affect when, where, and how much protein is made. Mutations in introns are often harmless.",
      "**Cystic Fibrosis** — Caused by mutations in the CFTR gene. Over 900 'bad' alleles exist, all recessive. CF patients are homozygous or compound heterozygous for bad alleles. Most common mutation: ΔF508. Causes thick mucus in lungs, pancreas, reproductive tract.",
      "**Trinucleotide Repeat Expansions** — CAG repeats code for glutamine. When the polyglutamine stretch is too long, proteins aggregate. Example: Huntington's disease. Shows genetic anticipation — severity increases across generations as the repeat expands.",
      "**Lactase Persistence SNP (Detail)** — A C→T SNP at position -13910 upstream of the LCT gene allows the Oct-1 transcription factor to bind, activating lactase production into adulthood. The T allele is dominant. Classic example of recent positive selection in dairy-farming populations.",
      "**Human Genome Project (HGP)** — First complete draft published 2004. Took 13 years. Sequenced 3 billion base pairs from 5 anonymous individuals of varying ethnicity.",
      "**HGP Key Findings** — 1) Only ~20,500 protein-coding genes (not >100,000 expected); ~60% similar to fly genes; only ~2% of DNA codes for genes. 2) Alternative splicing: each gene has ~5 isoforms → >100,000 proteins. 3) Humans are 99.9% identical; 0.1% = ~3 million differences, mostly SNPs. 4) >1,400 disease-causing mutations identified (before HGP: <100 known).",
      "**GWAS** — Genome-Wide Association Studies test hundreds of thousands of SNPs in large populations to find variants associated with complex diseases. ~10 million SNPs constitute 90% of human genetic variation. By 2015: >14,000 SNPs associated with >1,500 traits. Association ≠ certainty — increases risk, not guarantees disease.",
      "**Pharmacogenomics** — How patient genomes affect response to treatment. Part of GWAS applications. Individual genetic variation in drug-metabolising enzymes means people respond differently to medications.",
      "**Private Genome Sequencing** — Services like 23andMe (partial genome, ancestry focus, cheaper) and Illumina Clinical Laboratory (whole genome, full clinical advice, more expensive). Key considerations: whole genome vs SNP panel; clinical counselling; data privacy; results give risk, not certainty."
    ],
    flashcards: [
      { id: "dna-1", front: "How many chromosomes do humans have and how are they organised?", back: "46 chromosomes (23 pairs): 22 pairs of autosomes and 1 pair of sex chromosomes. A karyotype displays these arranged by size." },
      { id: "dna-2", front: "What is semi-conservative replication?", back: "Before cell division, each DNA strand serves as a template for a new complementary strand. The resulting molecule has one original and one new strand — hence 'semi-conservative'." },
      { id: "dna-3", front: "What is the key difference between mitosis and meiosis?", back: "Mitosis → 2 identical diploid cells (growth/repair). Meiosis → 4 genetically unique haploid gametes (23 chromosomes each) for reproduction. Meiosis involves crossing over." },
      { id: "dna-4", front: "Explain the 'restaurant analogy' for gene expression.", back: "Genome = the full menu. RNA (transcription) = the orders sent to the kitchen. Proteins (translation) = the dishes served. Uracil replaces thymine in RNA." },
      { id: "dna-5", front: "What is the difference between homozygous and heterozygous?", back: "Homozygous = two identical alleles at a locus. Heterozygous = two different alleles. A dominant allele masks the recessive in heterozygotes; co-dominant alleles are both expressed (e.g. AB blood group)." },
      { id: "dna-6", front: "What is genetic fitness?", back: "Reproductive success: survival to reproductive age + mating success + producing healthy offspring. If an allele confers an advantage, it persists or becomes more common in the population." },
      { id: "dna-7", front: "Give 3 examples of beneficial mutations in humans.", back: "1) TAS2R38 — reduced bitter taste, allowed eating more vegetables. 2) Lactase persistence — maintained lactase production into adulthood for dairy farming. 3) CCR5 mutation — homozygotes immune to HIV." },
      { id: "dna-8", front: "How does the sickle cell allele demonstrate balancing selection?", back: "Heterozygous carriers are protected from malaria (advantage). Homozygous individuals develop sickle cell anaemia (disadvantage). The allele is maintained at high frequency in malaria-endemic regions because carriers survive better." },
      { id: "dna-9", front: "What is the difference between germline and somatic mutations?", back: "Germline (hereditary): inherited from a parent gamete, present in every cell of the body. Somatic (acquired): occurs during life, only in the affected cell and its descendants." },
      { id: "dna-10", front: "What are the three types of SNP effect?", back: "Silent: no amino acid change (often at wobble position). Nonsense: creates an early STOP codon → truncated protein. Missense: wrong amino acid substituted → potentially altered protein function." },
      { id: "dna-11", front: "Why are frameshift mutations usually severe?", back: "An insertion/deletion that isn't a multiple of 3 shifts the entire reading frame downstream, usually producing an early STOP codon → shorter or absent protein → very harmful." },
      { id: "dna-12", front: "Why does mutation location matter?", back: "Exon mutations directly alter the protein. Promoter/enhancer mutations affect when, where, and how much protein is made. Intron mutations are often harmless because introns are spliced out." },
      { id: "dna-13", front: "How does the lactase persistence SNP work at a molecular level?", back: "A C→T change at position -13910 upstream of the LCT gene creates a binding site for the Oct-1 transcription factor, keeping lactase gene expression active into adulthood. The T allele is dominant." },
      { id: "dna-14", front: "What were the 4 key findings of the Human Genome Project?", back: "1) Only ~20,500 genes (not 100k+). 2) Alternative splicing: ~5 isoforms per gene → >100k proteins. 3) Humans 99.9% identical (~3M SNP differences). 4) >1,400 disease mutations found (vs <100 before HGP)." },
      { id: "dna-15", front: "What is a GWAS and what does 'association' mean?", back: "Genome-Wide Association Study: tests hundreds of thousands of SNPs in large populations to find variants linked to disease. Association ≠ causation — having a risk SNP increases probability but doesn't guarantee disease." },
      { id: "dna-16", front: "What is Cystic Fibrosis genetically?", back: "Caused by mutations in the CFTR gene. Over 900 'bad' alleles exist, all recessive. Patients are homozygous or compound heterozygous for bad alleles. Most common: ΔF508." }
    ],
    quiz: [
      { id: "dna-q1", question: "How many pairs of autosomes do humans have?", options: ["22", "23", "44", "46"], correctIndex: 0 },
      { id: "dna-q2", question: "What does 'semi-conservative' mean in DNA replication?", options: ["Both strands are new", "One original + one new strand per molecule", "Only half the DNA is copied", "Replication is error-free 50% of the time"], correctIndex: 1 },
      { id: "dna-q3", question: "Which type of cell division produces haploid gametes?", options: ["Mitosis", "Meiosis", "Binary fission", "Budding"], correctIndex: 1 },
      { id: "dna-q4", question: "In the 'restaurant analogy', what does RNA represent?", options: ["The menu", "The orders", "The dishes", "The kitchen"], correctIndex: 1 },
      { id: "dna-q5", question: "The CCR5 mutation protects homozygous carriers from:", options: ["Malaria", "HIV", "Tuberculosis", "Cystic Fibrosis"], correctIndex: 1 },
      { id: "dna-q6", question: "The wobble position is the ___ letter of a codon.", options: ["First", "Second", "Third", "Any"], correctIndex: 2 },
      { id: "dna-q7", question: "A missense mutation results in:", options: ["No amino acid change", "An early STOP codon", "A wrong amino acid substitution", "A frameshift"], correctIndex: 2 },
      { id: "dna-q8", question: "Mutations in introns are usually:", options: ["Lethal", "Harmless", "Dominant", "Beneficial"], correctIndex: 1 },
      { id: "dna-q9", question: "The Human Genome Project found approximately how many protein-coding genes?", options: ["5,000", "20,500", "100,000", "3 million"], correctIndex: 1 },
      { id: "dna-q10", question: "What percentage of human DNA is identical between any two people?", options: ["95%", "99%", "99.9%", "100%"], correctIndex: 2 },
      { id: "dna-q11", question: "How does alternative splicing increase protein diversity?", options: ["By duplicating genes", "By producing ~5 isoforms per gene", "By adding new chromosomes", "By increasing mutation rate"], correctIndex: 1 },
      { id: "dna-q12", question: "The lactase persistence SNP is a C→T change that allows binding of which transcription factor?", options: ["TATA-binding protein", "Oct-1", "p53", "CREB"], correctIndex: 1 },
      { id: "dna-q13", question: "GWAS found ~10 million SNPs constitute what percentage of human genetic variation?", options: ["50%", "75%", "90%", "99%"], correctIndex: 2 },
      { id: "dna-q14", question: "Co-dominant alleles result in:", options: ["One allele masking the other", "Both alleles being expressed", "Neither allele expressed", "A lethal phenotype"], correctIndex: 1 }
    ]
  },

  // ─────────────────────────────────────────────
  // TOPIC 2 — Development & Stem Cells
  // ─────────────────────────────────────────────
  {
    id: "development-stem-cells",
    name: "Development & Stem Cells",
    icon: "🔬",
    notes: [
      // Part A: Development
      "**From Zygote to Organism** — A fertilised egg (zygote) develops into trillions of cells with 220 cell types organised in tissues and organs. This requires mitosis, cell differentiation, and morphogenesis.",
      "**Cleavage** — The zygote divides by mitosis into blastomeres, partitioning the cytoplasm. At 5 days: blastocyst forms with an inner cell mass (ICM = future embryo) and trophoblast (future placenta).",
      "**Gastrulation** — Coordinated cell movements organise ICM cells into three germ layers: Ectoderm (skin & nervous system), Mesoderm (muscles, blood, skeleton, connective tissue, heart), Endoderm (digestive system, lungs). The primitive streak defines the anterior-posterior axis.",
      "**Body Plan & Organogenesis** — Body axes are set early (anterior-posterior, dorsal-ventral, proximal-distal). Neurogenesis along the AP axis provides the framework. Somites form along the axis → future muscles, vertebral column, dermis. Organogenesis is progressive: cells move, specialise, and organise into tissues and organs.",
      "**Cell Differentiation & Potency** — Potency decreases as cells specialise: totipotent → pluripotent → multipotent → oligopotent → unipotent → fully differentiated. A cell's identity depends on which proteins it expresses, which depends on which genes are switched on.",
      "**Gene Expression in Differentiation** — At any time, each cell expresses ~20% of its genes. ~10% of those are developmental genes coding for transcription factors and signalling proteins that control which other genes are ON or OFF.",
      "**How Initial Differences Arise** — Maternal proteins deposited unevenly in the egg cytoplasm. As cleavage occurs, blastomeres end up with different maternal proteins → different gene expression → cascade of further differences between cells.",
      "**Dolly the Sheep (1997)** — Proved that a differentiated cell still contains the full genome (genes are not lost during specialisation). However, the DNA had to be reprogrammed to retrieve totipotency — showing that differentiation involves gene silencing, not gene loss.",
      "**Cell Potency Summary** — Zygote = totipotent (can become a whole organism). ICM = pluripotent (any body cell but not placenta). Germ layers (ectoderm/mesoderm/endoderm) = multipotent (cell types within that lineage). Fully differentiated = no further division/specialisation.",
      // Part B: Stem Cells
      "**What is a Stem Cell?** — A cell that can both proliferate (divide) and specialise (differentiate). Stem cells maintain tissue homeostasis throughout life.",
      "**Telomeres** — Non-coding DNA repeats at chromosome ends. Shorten at each mitosis → limit proliferative potential. Cells expressing telomerase protect their telomeres and maintain proliferative capacity (stem cells, cancer cells).",
      "**Embryonic Stem Cells (ESCs)** — Derived from the inner cell mass. Immortal and pluripotent. Can make any cell in the body. Differentiation controlled in vitro by changing culture medium cocktail. Ethical concerns because the embryo is destroyed.",
      "**Adult Stem Cells (ASCs)** — Present in many tissues (bone marrow, intestines, fat, skin) but often rare and divide infrequently. Generally multipotent. Bone marrow contains both haematopoietic stem cells (HSCs → blood) and mesenchymal stem cells (MSCs → bone, cartilage, tendons, muscle, fat).",
      "**ASC Plasticity** — Some ASCs can trans-differentiate into cells from a different germ layer in the lab (low efficiency). MSCs are the most plastic — can become liver cells (endoderm) and brain cells (ectoderm).",
      "**Neonatal Stem Cells** — From placenta and umbilical cord blood. Contain HSCs and MSCs. Less immunogenic than adult bone marrow, longer telomeres, less DNA damage, non-invasive harvesting. Problem: small quantity (though expansion protocols now exist). Can be privately stored or donated at birth.",
      "**Induced Pluripotent Stem Cells (iPSCs)** — Somatic cells (e.g. skin) genetically reprogrammed with 4 genes (Yamanaka factors: Oct4, Sox2, Klf4, c-Myc) to revert to pluripotent state resembling ESCs. First created November 2007. Nobel Prize 2012 (Shinya Yamanaka). Applications: disease-in-a-dish modelling, organ-on-a-chip, autologous cell therapy.",
      "**Immunocompatibility** — All cells carry surface proteins (encoded by 5 highly polymorphic genes) recognised as 'self'. Foreign cells without matching proteins are attacked. Graft-versus-host disease: donor immune cells attack the recipient. Neonatal cells are less immunogenic because foetuses/neonates express fewer surface markers.",
      "**Currently Approved Therapies** — Skin grafts. HSC transplant from adult bone marrow or neonatal cells (treats leukaemia and blood disorders).",
      "**Recent Advances** — Tissue engineering: tracheal engineering with patient's own stem cells (autologous transplant, 2008); also bladder and heart valve work. MSCs for cartilage repair. ESC-derived retinal pigmented epithelial (RPE) cells in phase III trials for blindness (eye is immunologically privileged).",
      "**Why MSCs Are Promising** — Easy to isolate and grow in large quantities. Can be frozen/thawed. Possess immunosuppressive and anti-inflammatory effects. Can home to sites of injury. Isolated from bone marrow, fat tissue, or umbilical cord.",
      "**Reality Check** — Most therapies require three phases of clinical trials. Many foreign clinics advertise unproven MSC treatments with no published trial data — exercise caution."
    ],
    flashcards: [
      { id: "stem-1", front: "What does the inner cell mass (ICM) become vs the trophoblast?", back: "ICM = the future embryo (pluripotent cells). Trophoblast = the future placenta. Both form part of the blastocyst at ~day 5." },
      { id: "stem-2", front: "Name the three germ layers and what they produce.", back: "Ectoderm: skin & nervous system. Mesoderm: muscles, blood, skeleton, connective tissue, heart. Endoderm: digestive system & lungs. Formed during gastrulation." },
      { id: "stem-3", front: "What is the potency hierarchy from most to least potent?", back: "Totipotent (zygote) → Pluripotent (ICM/ESCs) → Multipotent (germ layers/ASCs) → Oligopotent → Unipotent → Fully differentiated. Potency decreases as cells specialise." },
      { id: "stem-4", front: "How do cells initially become different from each other?", back: "Maternal proteins are deposited unevenly in the egg cytoplasm. During cleavage, blastomeres inherit different amounts → different gene expression → cascade of further differences." },
      { id: "stem-5", front: "What did Dolly the Sheep prove?", back: "That a fully differentiated cell still contains the complete genome — genes are not lost during specialisation. However, the DNA needed reprogramming to retrieve totipotency." },
      { id: "stem-6", front: "What are telomeres and why do they matter for stem cells?", back: "Non-coding DNA repeats at chromosome ends that shorten at each division, limiting proliferative potential. Cells expressing telomerase (including stem cells) protect their telomeres and can keep dividing." },
      { id: "stem-7", front: "What are the Yamanaka factors and what do they do?", back: "Oct4, Sox2, Klf4, and c-Myc — four transcription factors that reprogram adult somatic cells into induced pluripotent stem cells (iPSCs). Nobel Prize 2012." },
      { id: "stem-8", front: "What makes neonatal stem cells advantageous?", back: "Less immunogenic than adult cells, longer telomeres, less DNA damage, non-invasive harvesting from placenta/cord blood. Contain both HSCs and MSCs." },
      { id: "stem-9", front: "What is graft-versus-host disease?", back: "When transplanted donor immune cells recognise the recipient's tissues as foreign and attack them. Caused by mismatch in surface proteins encoded by 5 highly polymorphic genes." },
      { id: "stem-10", front: "What does MSC plasticity mean?", back: "MSCs (mesenchymal stem cells, from mesoderm) can trans-differentiate into cells from a different germ layer in the lab — e.g. liver cells (endoderm) or brain cells (ectoderm). Low efficiency but remarkable." },
      { id: "stem-11", front: "Why are MSCs particularly promising for therapy?", back: "Easy to isolate and grow in bulk, can be frozen/thawed, have immunosuppressive and anti-inflammatory effects, and can home to sites of injury. Sourced from bone marrow, fat, or umbilical cord." },
      { id: "stem-12", front: "Why is the eye a good target for ESC-derived cell therapy?", back: "The eye is immunologically privileged (less immune rejection), only a small number of cells are needed, and the other eye serves as an internal control. ESC-derived RPE cells are in phase III trials." },
      { id: "stem-13", front: "What percentage of genes does a typical cell express at any time?", back: "About 20% of its genes. Of those, ~10% are developmental genes encoding transcription factors and signalling proteins that control other genes." },
      { id: "stem-14", front: "What is the ethical advantage of iPSCs over ESCs?", back: "iPSCs are made from adult somatic cells — no embryo destruction required. They also enable autologous therapy (patient's own cells), reducing immune rejection." }
    ],
    quiz: [
      { id: "stem-q1", question: "The trophoblast becomes:", options: ["The embryo", "The placenta", "The umbilical cord", "The amniotic sac"], correctIndex: 1 },
      { id: "stem-q2", question: "During gastrulation, the mesoderm gives rise to:", options: ["Skin and nervous system", "Muscles, blood, and skeleton", "Digestive system and lungs", "Placental tissue"], correctIndex: 1 },
      { id: "stem-q3", question: "Dolly the Sheep proved that differentiated cells:", options: ["Lose most of their DNA", "Retain the complete genome", "Cannot be reprogrammed", "Are always multipotent"], correctIndex: 1 },
      { id: "stem-q4", question: "Which cells are totipotent?", options: ["Inner cell mass cells", "Zygote to ~8-cell stage", "Adult stem cells", "iPSCs"], correctIndex: 1 },
      { id: "stem-q5", question: "Telomeres are protected by which enzyme?", options: ["DNA polymerase", "Telomerase", "Helicase", "Ligase"], correctIndex: 1 },
      { id: "stem-q6", question: "Who won the Nobel Prize for iPSC discovery?", options: ["James Watson", "Shinya Yamanaka", "Francis Crick", "Ian Wilmut"], correctIndex: 1 },
      { id: "stem-q7", question: "Which Yamanaka factor is also an oncogene?", options: ["Oct4", "Sox2", "Klf4", "c-Myc"], correctIndex: 3 },
      { id: "stem-q8", question: "Neonatal stem cells are less immunogenic because:", options: ["They lack DNA", "Foetuses/neonates express fewer surface markers", "They come from the father", "They are pluripotent"], correctIndex: 1 },
      { id: "stem-q9", question: "MSC plasticity refers to their ability to:", options: ["Divide indefinitely", "Trans-differentiate into cells from a different germ layer", "Resist immune attack", "Form entire organisms"], correctIndex: 1 },
      { id: "stem-q10", question: "What percentage of a cell's genes are expressed at any given time?", options: ["1%", "10%", "20%", "50%"], correctIndex: 2 },
      { id: "stem-q11", question: "Initial cell differences in the embryo arise from:", options: ["Random mutations", "Uneven maternal protein distribution", "Viral infection", "Epigenetic editing by the father's genome"], correctIndex: 1 },
      { id: "stem-q12", question: "Graft-versus-host disease is caused by:", options: ["Recipient rejecting donor cells", "Donor immune cells attacking recipient tissue", "Bacterial infection", "Telomere shortening"], correctIndex: 1 }
    ]
  },

  // ─────────────────────────────────────────────
  // TOPIC 3 — Precision Medicine
  // ─────────────────────────────────────────────
  {
    id: "precision-medicine",
    name: "Precision Medicine",
    icon: "🎯",
    notes: [
      "**Definitions** — Personalised Medicine: preventative care and drug therapy based on an individual's genetic information. Precision Medicine: tailoring treatment to individual characteristics, classifying patients into subpopulations — 'the right medicine, at the right time, at the right dose'. P4 Medicine: Predictive, Preventive, Personalised, Participatory.",
      "**Biomarkers** — A measurable indicator of a biological state (e.g. glucose, hormone level, tumour marker, gene variant). Used for diagnosis, risk prediction, prognosis, treatment selection, pharmacogenomics, and monitoring.",
      "**History of Precision Medicine** — 1902: Garrod — inheritance of alkaptonuria. 1907: Ottenberg — first blood transfusion with compatibility testing. 1956: genetic basis of primaquine toxicity (G6PD deficiency). 1977: CYP450 enzyme variation linked to drug toxicity. 2003: HGP completed. At HGP start: 4 drugs with pharmacogenomic info. Now: 261 drugs, 362 drug-biomarker pairs.",
      "**Traditional vs Precision** — Traditional = 'one size fits all' blockbuster drug for the 'typical' patient (not effective for everyone). Precision = accounts for individual genetic, environmental, and lifestyle differences.",
      "**Data Sources** — Symptoms, physical exam, medical history, lab tests (blood, urine), imaging, family history, genetics, lifestyle/environment. Omics data: genomics, transcriptomics, proteomics, lipidomics, metabolomics, epigenomics.",
      "**Biomarker Use 1: Diagnosis** — e.g. PSA for prostate cancer. Note: PSA has low specificity — only 25–33% of men with high PSA actually have cancer.",
      "**Biomarker Use 2: Risk Prediction** — e.g. BRCA1/2 mutations. BRCA+ women have 85% lifetime breast cancer risk (vs 13% baseline) and 60% lifetime ovarian cancer risk (vs 0.7% baseline).",
      "**Biomarker Use 3: Prognosis** — e.g. MammaPrint: a 70-gene risk-of-recurrence signature for early-stage breast cancer, guiding whether chemotherapy is needed.",
      "**Biomarker Use 4: Predictive** — e.g. HER2 testing: 25–30% of breast cancers are HER2+. Trastuzumab (Herceptin) gives 52% reduction in tumour recurrence in HER2+ patients compared to chemo alone.",
      "**Biomarker Use 5: Pharmacogenomics (PGx)** — How genes affect drug safety/efficacy. CYP450 family metabolises >90% of drugs. Variants create slow, normal, fast, or ultra-fast metabolisers. Example: Clopidogrel (Plavix) is a prodrug activated by CYP2C19. Poor metabolisers have 3-fold higher clot risk after stent implantation.",
      "**Biomarker Use 6: Monitoring** — e.g. Ki67: nuclear protein associated with tumour proliferation. Reduction in Ki67 indicates treatment is working.",
      "**Cancer Application: EGFR-mutant Lung Cancer** — EGFR pathway changes drive growth. EGFR inhibitors used if specific mutations are present (exon 19 deletion, L858R). Resistance can develop; re-testing guides next-line therapy.",
      "**Cancer Application: HER2+ Breast Cancer** — HER2 overexpression promotes cell growth. Tested via IHC (protein level) and FISH (gene amplification). Trastuzumab blocks HER2 signalling.",
      "**Oncotype DX** — A 16-gene assay for ER-positive, HER2-negative breast cancer. Calculates a recurrence score (1–100) determining whether chemotherapy is needed. Costs ~$4,175.",
      "**Companion Diagnostics (CDx)** — Tests that determine if a patient will benefit from a specific targeted therapy. Example: Cobas platform detects BRAF V600E mutation (real-time PCR) → guides Zelboraf treatment. FDA-approved CDx helps accelerate drug market access.",
      "**Precision in Infectious Disease** — Identify the exact pathogen plus its resistance profile. Genomic sequencing compares cases at high resolution to identify transmission chains. Used to track SARS-CoV-2 variants, detect hospital outbreaks (MRSA), monitor resistance emergence.",
      "**Technologies** — DNA biomarkers: sequencing, PCR, microarrays. Protein biomarkers: ELISA, gel electrophoresis, surface plasmon resonance, mass spectrometry, Raman spectroscopy. Multiplexing allows multiple biomarkers from one sample.",
      "**Controversies** — Genome data raises questions about storage, access, and misuse. A second mutation may render targeted therapy ineffective (driver vs passenger mutations). Statistical robustness a concern with thousands of variables. AI may help handle data volume.",
      "**Success Story: Dr Lukus Wartman** — Cancer genome sequenced, gene in 'overdrive' identified, targeted treatment given. Still in remission 15+ years later.",
      "**Other Applications** — Precision devices: tinnitus maskers, quantitative EEG, artificial pancreas, custom splints. 3D printing: polypills with patient-specific dosing (e.g. Spritam for epilepsy); 3D-printed tissues and organs. DTC tests: 23andMe (ancestry, carrier status)."
    ],
    flashcards: [
      { id: "pm-1", front: "What does P4 medicine stand for?", back: "Predictive, Preventive, Personalised, Participatory — a model where patients are active partners and care is proactive rather than reactive." },
      { id: "pm-2", front: "How did the number of pharmacogenomic drugs change since the HGP?", back: "At the start of HGP: only 4 drugs had pharmacogenomic information. Now: 261 drugs with 362 drug-biomarker pairs." },
      { id: "pm-3", front: "Why is PSA a problematic diagnostic biomarker?", back: "Low specificity: only 25–33% of men with elevated PSA actually have prostate cancer. Many false positives leading to unnecessary anxiety and procedures." },
      { id: "pm-4", front: "What are the BRCA1/2 lifetime cancer risks?", back: "BRCA+ women: 85% lifetime breast cancer risk (vs 13% baseline) and 60% ovarian cancer risk (vs 0.7% baseline). Guides decisions about prophylactic surgery and screening." },
      { id: "pm-5", front: "How does trastuzumab (Herceptin) work?", back: "A monoclonal antibody targeting the HER2 receptor, overexpressed in 25–30% of breast cancers. Blocks HER2 signalling, giving 52% reduction in tumour recurrence vs chemo alone." },
      { id: "pm-6", front: "What is the Clopidogrel/CYP2C19 pharmacogenomics example?", back: "Clopidogrel is a prodrug activated by CYP2C19. Patients with loss-of-function CYP2C19 variants are poor metabolisers → reduced activation → less platelet inhibition → 3-fold higher clot risk after stent." },
      { id: "pm-7", front: "What is Oncotype DX?", back: "A 16-gene assay for ER+, HER2- breast cancer that calculates a recurrence score (1–100) to determine whether chemotherapy is needed. Costs ~$4,175." },
      { id: "pm-8", front: "What is a companion diagnostic (CDx)?", back: "A test performed before prescribing a targeted therapy to confirm the patient has the specific biomarker the drug targets. E.g. Cobas detects BRAF V600E → guides Zelboraf treatment." },
      { id: "pm-9", front: "How is precision medicine used in infectious disease?", back: "Genomic sequencing identifies exact pathogen + resistance profile, compares cases to map transmission chains. Used for SARS-CoV-2 variant tracking, MRSA outbreak detection, and resistance monitoring." },
      { id: "pm-10", front: "What are driver vs passenger mutations in cancer?", back: "Driver mutations actively promote cancer growth and are therapeutic targets. Passenger mutations are along for the ride and don't contribute. A second driver mutation may render targeted therapy ineffective." },
      { id: "pm-11", front: "What is the difference between personalised and precision medicine?", back: "Personalised = truly individual treatment. Precision = stratifying patients into subpopulations by biomarkers to select the most effective therapy for that group." },
      { id: "pm-12", front: "What is MammaPrint?", back: "A 70-gene signature test that predicts risk of recurrence in early-stage breast cancer, helping determine whether chemotherapy is needed beyond surgery." },
      { id: "pm-13", front: "How does EGFR-targeted therapy work in lung cancer?", back: "EGFR pathway changes drive tumour growth. EGFR inhibitors are prescribed if specific mutations are present (exon 19 deletion, L858R). Resistance can develop, requiring re-testing." },
      { id: "pm-14", front: "What is Ki67 used for?", back: "Ki67 is a nuclear protein associated with tumour cell proliferation. Used to monitor treatment response — a reduction in Ki67 indicates the therapy is working." }
    ],
    quiz: [
      { id: "pm-q1", question: "What lifetime breast cancer risk does a BRCA1/2 mutation confer?", options: ["13%", "45%", "60%", "85%"], correctIndex: 3 },
      { id: "pm-q2", question: "What percentage of breast cancers are HER2-positive?", options: ["5–10%", "15–20%", "25–30%", "40–50%"], correctIndex: 2 },
      { id: "pm-q3", question: "PSA testing for prostate cancer has a specificity of:", options: ["5–10%", "25–33%", "60–70%", "90–95%"], correctIndex: 1 },
      { id: "pm-q4", question: "Clopidogrel is a prodrug activated by which enzyme?", options: ["CYP2D6", "CYP2C19", "CYP3A4", "CYP1A2"], correctIndex: 1 },
      { id: "pm-q5", question: "How many drugs now have pharmacogenomic information?", options: ["4", "50", "261", "1,000"], correctIndex: 2 },
      { id: "pm-q6", question: "What does Oncotype DX calculate?", options: ["Mutation count", "Recurrence score (1–100)", "Drug dosage", "Survival months"], correctIndex: 1 },
      { id: "pm-q7", question: "Trastuzumab provides what reduction in tumour recurrence for HER2+ patients?", options: ["10%", "25%", "52%", "80%"], correctIndex: 2 },
      { id: "pm-q8", question: "The 'P' NOT in P4 medicine is:", options: ["Predictive", "Preventive", "Proactive", "Participatory"], correctIndex: 2 },
      { id: "pm-q9", question: "A companion diagnostic is performed:", options: ["After treatment ends", "Before prescribing targeted therapy", "During surgery only", "Once per year"], correctIndex: 1 },
      { id: "pm-q10", question: "CYP450 enzymes metabolise approximately what percentage of drugs?", options: ["25%", "50%", "75%", ">90%"], correctIndex: 3 },
      { id: "pm-q11", question: "MammaPrint analyses how many genes?", options: ["16", "21", "50", "70"], correctIndex: 3 },
      { id: "pm-q12", question: "Which technology detects BRAF V600E for the Cobas CDx?", options: ["ELISA", "Mass spectrometry", "Real-time PCR", "Western blot"], correctIndex: 2 }
    ]
  },

  // ─────────────────────────────────────────────
  // TOPIC 4 — The Human Brain
  // ─────────────────────────────────────────────
  {
    id: "human-brain",
    name: "The Human Brain",
    icon: "🧠",
    notes: [
      // Lecture 1
      "**Brain Overview** — Controls body functions (movement, cardiovascular, respiratory) and processes information (dreams, emotions, reasoning). Highly convoluted surface: ridges = gyri, valleys = sulci/fissures. Convolutions increase cortical surface area.",
      "**Frontal Lobe** — Movement, personality, planning. Contains the primary motor cortex.",
      "**Parietal Lobe** — Awareness of surroundings and stereognosis (identifying objects by touch). Contains the primary somatosensory cortex.",
      "**Temporal Lobe** — Hearing and language.",
      "**Occipital Lobe** — Processing visual signals.",
      "**Other Structures** — Cerebellum: coordinates movement and posture. Brainstem (midbrain, pons, medulla oblongata): cardiovascular and respiratory centres.",
      "**Nervous System Organisation** — CNS = brain + spinal cord. PNS = spinal nerves + cranial nerves. Somatic nervous system = voluntary movement.",
      "**The Neuron** — Basic unit of the nervous system. Signal travels along the axon via saltatory conduction (jumping between nodes of Ranvier, where myelin gaps are).",
      "**Neuroglia (Support Cells)** — Schwann cells: myelinate neurons in the PNS. Oligodendrocytes: myelinate neurons in the CNS. Astrocytes: homeostasis, metabolic support, blood-brain barrier. Microglia: resident phagocytes of the brain; also involved in synaptic pruning.",
      "**Resting Membrane Potential** — –70mV (inside of cell is negative). Na⁺ channels closed; some K⁺ channels open; Na⁺/K⁺ exchanger maintains balance.",
      "**The Action Potential** — When stimulated: all Na⁺ channels open → sodium floods in (down concentration gradient) → membrane depolarises (inside becomes positive). This is 'all or nothing' — the neuron either fires fully or not at all. Repolarisation: Na⁺/K⁺ pump restores resting potential. APs travel down the axon away from the cell body.",
      "**The Synapse** — Gap between neurons = synaptic cleft. AP reaches axon terminal → vesicles fuse with pre-synaptic membrane → neurotransmitters released → bind shape-specific receptors on post-synaptic neuron (lock and key). Can be excitatory (triggers AP) or inhibitory (dampens activity).",
      "**Key Neurotransmitters** — Serotonin (mood, sleep), Dopamine (reward, motivation, movement), Noradrenaline (alertness, fight-or-flight), GABA (inhibition, calming), Glutamate (excitation, learning).",
      // Lecture 2
      "**Nature vs Nurture** — All human diseases, including mental health disorders, involve a mix of genes and environment (GxE). Even strongly genetic conditions (e.g. Huntington's) are shaped by environment in onset, progression, and treatment response.",
      "**Risk Factors** — Something that increases the chance of developing a disease — not a guarantee. Can be genetic (G) or environmental (E). A traumatic event can 'set off' symptoms like a glass overflowing. Resilience factors provide extra 'space in the glass'.",
      "**Environmental Risk Factors** — Infections during pregnancy, maternal stress/malnutrition, obstetric complications, low birth weight, urban upbringing, cannabis in adolescence, social isolation, physical/sexual abuse, loss of parent, low socioeconomic status, extreme paternal age.",
      "**DOHaD (David Barker's Hypothesis)** — Developmental Origins of Health and Disease: early-life environmental exposures (nutrition, stress, chemicals, inflammation) during prenatal/perinatal/neonatal stages permanently shape long-term health and chronic disease risk, including mental health.",
      "**Maternal Immune Activation (MIA)** — A recognised risk factor for neurodevelopmental disorders in offspring. Evidence: Dutch Hunger Winter (1944–45) and 1957 Influenza A2 pandemic — second-trimester flu exposure elevated schizophrenia risk in offspring.",
      "**Three MIA Hypotheses** — 1) Placental route: MIA disrupts placental function affecting fetal development. 2) Fetal brain route: maternal cytokines cross into fetal brain and disrupt development (cytokines normally guide neuron migration). 3) Postnatal care route: MIA impairs maternal care behaviours after birth.",
      "**MIA Effects on the Brain** — Microglia become 'activated' → pathological synaptic pruning (removing too many synapses). Myelination is disrupted: reduced white matter, decreased oligodendrocyte number, decreased myelin proteins (MBP, OLIG2). GWAS supports myelin-related genes as schizophrenia risk factors.",
      "**Epigenetics** — Genetics = the house blueprint. Epigenetics = the contractor telling you when and how many to build. The genetic code is fixed; the epigenetic code can be changed AND inherited. Methylation = an epigenetic mark controlling gene expression.",
      "**Epigenetics & MIA** — MIA causes epigenetic changes (altered methylation) in offspring brains on genes controlling myelination and microglia function. This is how brains 'remember' trauma — the environment leaves a lasting mark on gene expression."
    ],
    flashcards: [
      { id: "brain-1", front: "What are gyri and sulci?", back: "Gyri = ridges on the brain surface. Sulci = valleys/fissures between ridges. Convolutions increase cortical surface area, allowing more neurons in the cerebral cortex." },
      { id: "brain-2", front: "Name the four lobes of the cerebral cortex and their main functions.", back: "Frontal: movement, personality, planning. Parietal: sensory processing, stereognosis. Temporal: hearing, language. Occipital: visual processing." },
      { id: "brain-3", front: "What is saltatory conduction?", back: "The process by which action potentials 'jump' between nodes of Ranvier (gaps in the myelin sheath) along the axon. Much faster than continuous conduction along unmyelinated fibres." },
      { id: "brain-4", front: "Name 4 types of neuroglia and their functions.", back: "Schwann cells: myelinate PNS neurons. Oligodendrocytes: myelinate CNS neurons. Astrocytes: homeostasis, metabolic support, blood-brain barrier. Microglia: phagocytes, synaptic pruning." },
      { id: "brain-5", front: "Describe the action potential in 3 steps.", back: "1) Stimulus opens Na⁺ channels → Na⁺ floods in → depolarisation (inside becomes positive). 2) 'All or nothing' — fires fully or not at all. 3) Na⁺/K⁺ pump restores –70mV resting potential (repolarisation)." },
      { id: "brain-6", front: "How does neurotransmitter signalling work at a synapse?", back: "AP reaches axon terminal → vesicles fuse with membrane → neurotransmitters released into synaptic cleft → bind shape-specific receptors on post-synaptic neuron (lock and key) → excitatory or inhibitory effect." },
      { id: "brain-7", front: "What is the DOHaD hypothesis?", back: "David Barker's Developmental Origins of Health and Disease: early-life exposures (nutrition, stress, chemicals, inflammation) during prenatal/perinatal stages permanently shape long-term health and chronic disease risk." },
      { id: "brain-8", front: "What evidence links Maternal Immune Activation to schizophrenia?", back: "Dutch Hunger Winter (1944–45) and 1957 Influenza A2 pandemic studies: offspring of mothers who had flu during the second trimester had elevated schizophrenia risk. Viral, bacterial, and parasitic infections all linked." },
      { id: "brain-9", front: "Name the 3 hypothesised routes by which MIA affects offspring.", back: "1) Placental route: disrupts placental function. 2) Fetal brain route: maternal cytokines cross into fetal brain, disrupting neuron migration. 3) Postnatal care route: MIA impairs maternal care behaviours." },
      { id: "brain-10", front: "How does MIA affect microglia and myelination?", back: "Microglia become 'activated' → pathological synaptic pruning (too many synapses removed). Myelination disrupted: reduced white matter, fewer oligodendrocytes, decreased myelin proteins (MBP, OLIG2)." },
      { id: "brain-11", front: "What is epigenetics in the context of brain development?", back: "The genetic code is fixed, but the epigenetic code (e.g. methylation marks) can be changed AND inherited. MIA causes altered methylation on genes controlling myelination and microglia — how brains 'remember' trauma." },
      { id: "brain-12", front: "What is the resting membrane potential and what maintains it?", back: "–70mV (inside negative). Maintained by the Na⁺/K⁺ pump (3 Na⁺ out, 2 K⁺ in), some open K⁺ leak channels, and closed Na⁺ channels." },
      { id: "brain-13", front: "What is stereognosis?", back: "The ability to identify objects by touch alone (without looking). A function of the parietal lobe and somatosensory cortex." },
      { id: "brain-14", front: "Explain the 'glass overflowing' metaphor for mental health risk.", back: "Risk factors (genetic and environmental) fill a person's 'glass'. A traumatic event can cause it to overflow (trigger symptoms). Resilience factors provide extra space, making the glass harder to overflow." }
    ],
    quiz: [
      { id: "brain-q1", question: "The resting membrane potential of a neuron is:", options: ["+40mV", "0mV", "–40mV", "–70mV"], correctIndex: 3 },
      { id: "brain-q2", question: "Oligodendrocytes myelinate neurons in the:", options: ["PNS only", "CNS only", "Both PNS and CNS", "Neither"], correctIndex: 1 },
      { id: "brain-q3", question: "Saltatory conduction occurs at:", options: ["Dendrites", "Cell body", "Nodes of Ranvier", "Synaptic cleft"], correctIndex: 2 },
      { id: "brain-q4", question: "The parietal lobe is responsible for:", options: ["Vision", "Hearing", "Sensory processing and stereognosis", "Personality and planning"], correctIndex: 2 },
      { id: "brain-q5", question: "An action potential is described as:", options: ["Graded response", "All or nothing", "Reversible", "Inhibitory only"], correctIndex: 1 },
      { id: "brain-q6", question: "Microglia are the brain's resident:", options: ["Myelinating cells", "Phagocytes", "Hormone producers", "Blood cells"], correctIndex: 1 },
      { id: "brain-q7", question: "The DOHaD hypothesis was proposed by:", options: ["Shinya Yamanaka", "David Barker", "Gregor Mendel", "James Watson"], correctIndex: 1 },
      { id: "brain-q8", question: "MIA studies found elevated schizophrenia risk when maternal infection occurred during:", options: ["First trimester", "Second trimester", "Third trimester", "After birth"], correctIndex: 1 },
      { id: "brain-q9", question: "Which epigenetic mark is discussed in relation to MIA?", options: ["Acetylation", "Methylation", "Phosphorylation", "Ubiquitination"], correctIndex: 1 },
      { id: "brain-q10", question: "MIA-activated microglia cause:", options: ["Enhanced myelination", "Pathological synaptic pruning", "Increased oligodendrocytes", "Blood-brain barrier strengthening"], correctIndex: 1 },
      { id: "brain-q11", question: "Which neurotransmitter is primarily associated with the reward system?", options: ["Serotonin", "GABA", "Dopamine", "Acetylcholine"], correctIndex: 2 },
      { id: "brain-q12", question: "Convolutions of the brain surface serve to:", options: ["Protect from injury", "Increase cortical surface area", "Store cerebrospinal fluid", "Connect the hemispheres"], correctIndex: 1 }
    ]
  },

  // ─────────────────────────────────────────────
  // TOPIC 5 — Microbes & Infectious Disease
  // ─────────────────────────────────────────────
  {
    id: "microbes-infectious-disease",
    name: "Microbes & Infectious Disease",
    icon: "🦠",
    notes: [
      "**Types of Microorganism** — Viruses (nanometre scale, 10⁻⁹m): genetic elements that replicate inside cells; nucleic acid + protein capsid. Bacteria (micrometre, 10⁻⁶m): single-celled prokaryotes, no membrane-bound nucleus. Also fungi and parasites.",
      "**Koch's Postulates** — Framework for proving a specific microorganism causes a specific disease: 1) Found in all cases of disease, 2) Isolated in pure culture, 3) Causes disease when introduced to healthy host, 4) Re-isolated from new host.",
      "**6 Categories of Emerging/Re-emerging Infections** — 1) Old diseases now known to be microbiological (H. pylori → ulcers; HPV → cervical cancer). 2) Re-emerging due to drug resistance (XDR-TB, MRSA). 3) Previously eradicated diseases re-emerging (syphilis, chlamydia). 4) Recognised infections spreading to new populations (Zika, Ebola, malaria moving north). 5) New infections from microbial changes (bird/swine flu via antigenic shift; SARS-CoV-2). 6) Discovering new roles for bacteria (gut microbiome).",
      "**Antigenic Shift in Influenza** — Influenza RNA viruses can reassort when different strains infect the same animal — producing a completely new viral subtype. This is how pandemic flu strains emerge (bird flu, swine flu).",
      "**How Antibiotics Work** — Target bacterial-specific structures: cell wall synthesis (penicillin, ceftriaxone), protein synthesis (tetracycline, erythromycin, azithromycin, spectinomycin), and several other mechanisms. Investing in new antibiotics is commercially unattractive: short treatment courses = low revenue; resistance undermines new drugs quickly.",
      "**Resistance Mechanism 1: Impermeability** — Bacteria have an outer membrane that prevents antibiotic entry. An innate resistance mechanism.",
      "**Resistance Mechanism 2: Efflux Pumps** — Membrane proteins that actively pump antibiotics out of the cell faster than they can accumulate.",
      "**Resistance Mechanism 3: Target Modification** — Bacteria alter the drug's molecular target so it can no longer bind effectively.",
      "**Resistance Mechanism 4: Drug Inactivation** — Bacteria produce enzymes that destroy the antibiotic. Classic example: β-lactamases break the β-lactam ring of penicillins.",
      "**Resistance Mechanism 5: Target Bypass** — Bacteria evolve alternative metabolic pathways that bypass the inhibited step entirely.",
      "**Why Resistance Arises** — Horizontal gene transfer via plasmid DNA (extra-chromosomal, mobile). Bacteria grow quickly → mutations accumulate. Overuse (over-the-counter in some countries, animal husbandry). Patients stopping antibiotics before infection is cleared.",
      "**Quorum Sensing (QS)** — Bacteria communicate using small signalling molecules ('autoinducers') that bind receptors on neighbouring bacteria, altering gene expression (e.g. toxin production, flagella). Quorum quenching — interfering with QS signals — is a potential new antibacterial strategy.",
      "**Phage Therapy** — Bacteriophages: viruses that infect bacteria (~10³¹ on Earth). Lytic phages kill bacteria; lysogenic phages enter dormancy. Discovered 1915 and 1917. Used in the 1930s but superseded by antibiotics. Antibiotic resistance has revived interest.",
      "**Phage Pros** — Multiply in hosts then are naturally cleared. Avoid killing normal microflora. Cocktails may reduce resistance. Low dosing; can disrupt biofilms.",
      "**Phage Cons** — Immunogenic (cleared from blood; may only work locally). Limited knowledge of phage biology. Latency risk, toxin release, strain variation, resistance can still emerge. FDA licensed for food processing (vs Listeria) 2006. Human use: compassionate only.",
      "**MRSA** — Methicillin-Resistant Staphylococcus aureus. S. aureus is a skin/throat commensal. First reported 1961. Acquired mecA gene → altered PBP2a. Resistant to all β-lactams. Peak: ~7,000 MRSA blood infections/year in UK; now ~700 (76% reduction since 2007).",
      "**Pseudomonas aeruginosa** — Causes lung infections (especially in cystic fibrosis). Naturally resistant to many antibiotics. Forms biofilms.",
      "**Clostridioides difficile** — Diarrhoeal infection in ill patients. Spores not killed by alcohol hand gel. Peak (2007): 55,498 cases; now ~18,970 (69% reduction). Triggered by antibiotic use disrupting normal gut flora.",
      "**CPE** — Carbapenemase-Producing Enterobacteriaceae. Resistant to many antibiotics. Found in ~25% of healthy people as gut commensals. Cause serious infections when they reach normally sterile sites.",
      "**Gut Microbiome** — ~100 trillion microorganisms in the human gut. Essential for digestion, vitamin production, immune development, and pathogen resistance. Disruption (dysbiosis) linked to many diseases.",
      "**Faecal Microbiota Transplants (FMT)** — Transfer of microbiota from healthy donor to patient. 85% cure rate for chronic C. difficile. What constitutes a 'healthy' microbiome varies; key factor may be metabolites rather than bacteria themselves.",
      "**FMT Considerations** — Autologous (patient's own, stored before illness) vs heterologous (donor). Risks: could transmit depression, anxiety, obesity, or other microbiome-linked conditions. Ethical: microflora can be passed on — informed consent? Can be passed to offspring?",
      "**Chlamydia** — Chlamydia trachomatis: most commonly diagnosed STI in England (>200,000 cases/year). Gram-negative obligate intracellular bacterium. Often asymptomatic (50% of men; 70–80% of women). Can cause PID and infertility if untreated.",
      "**Gonorrhoea** — Neisseria gonorrhoeae ('the clap'). Gram-negative cocci. 2018: first confirmed extensively drug-resistant case globally (England). Resistant to azithromycin and ceftriaxone; only susceptible to spectinomycin. Cases increasing: 2015–2021: 9 UK cases; 2022–2024: 15 cases (5 XDR).",
      "**Syphilis** — Treponema pallidum: unusual spirochaete. Stages: primary (painless chancre), secondary (rash), latent, tertiary (neurological/systemic, ~15% untreated). 2023: 8,195 new diagnoses in England — highest since 1948. Rise linked to PrEP reducing condom use."
    ],
    flashcards: [
      { id: "micro-1", front: "What are Koch's Postulates?", back: "4 criteria: 1) Microbe found in all cases, 2) Isolated in pure culture, 3) Causes disease in healthy host, 4) Re-isolated from experimentally infected host." },
      { id: "micro-2", front: "Name the 5 antibiotic resistance mechanisms.", back: "1) Impermeability (reduced entry), 2) Efflux pumps (drug pumped out), 3) Target modification (drug can't bind), 4) Drug inactivation (enzymatic destruction, e.g. β-lactamases), 5) Target bypass (alternative pathways)." },
      { id: "micro-3", front: "Name 6 categories of emerging/re-emerging infections.", back: "1) Old diseases now known to be microbial. 2) Re-emerging via drug resistance. 3) Previously eradicated, now returning. 4) Spreading to new populations. 5) New infections from microbial changes. 6) New roles discovered for bacteria." },
      { id: "micro-4", front: "What is antigenic shift in influenza?", back: "When different influenza strains infect the same animal, their RNA segments can reassort — producing a completely new viral subtype. This is how pandemic flu strains emerge (bird flu, swine flu)." },
      { id: "micro-5", front: "What is quorum sensing and quorum quenching?", back: "QS: bacteria communicate via small signalling molecules ('autoinducers') that alter gene expression in the population (toxin production, biofilm). Quorum quenching = interfering with these signals — a potential new antibacterial strategy." },
      { id: "micro-6", front: "What makes MRSA resistant?", back: "The mecA gene encodes an altered penicillin-binding protein (PBP2a) with low affinity for β-lactam antibiotics. First reported 1961. UK cases dropped from ~7,000 to ~700 (76% reduction since 2007)." },
      { id: "micro-7", front: "Why is C. difficile particularly problematic in hospitals?", back: "Forms spores that survive alcohol hand gel. Triggered when antibiotics disrupt normal gut flora. Peak: 55,498 cases (2007); now ~18,970. Produces toxins causing severe diarrhoea and pseudomembranous colitis." },
      { id: "micro-8", front: "What is FMT and what is its cure rate for C. diff?", back: "Faecal Microbiota Transplant: healthy donor stool transferred to patient's gut. 85% cure rate for chronic C. difficile. Risks: may transmit depression, obesity, or other conditions." },
      { id: "micro-9", front: "List 3 pros and 3 cons of phage therapy.", back: "Pros: self-amplifying, spare normal microflora, can disrupt biofilms. Cons: immunogenic (cleared from blood), limited phage biology knowledge, resistance can still emerge." },
      { id: "micro-10", front: "Why is gonorrhoea resistance a global emergency?", back: "N. gonorrhoeae has developed resistance to nearly every antibiotic. 2018: first XDR case globally (England). Some strains only susceptible to spectinomycin. Cases increasing." },
      { id: "micro-11", front: "Why is chlamydia particularly dangerous?", back: "Often asymptomatic (50% men, 70–80% women) so goes undetected. Most common bacterial STI in England (>200k cases/year). Untreated → PID and infertility." },
      { id: "micro-12", front: "What are the stages of syphilis?", back: "Primary: painless chancre. Secondary: hypersensitive rash. Latent: no symptoms. Tertiary: neurological/systemic complications (~15% of untreated cases). 2023: 8,195 diagnoses in England — highest since 1948." },
      { id: "micro-13", front: "Why is antibiotic resistance accelerating?", back: "Horizontal gene transfer via plasmids. Rapid bacterial growth → quick mutation accumulation. Overuse in humans (some OTC) and animal husbandry. Patients stopping courses early." },
      { id: "micro-14", front: "How do β-lactamases confer resistance?", back: "Bacterial enzymes that hydrolyse the β-lactam ring — the core structure of penicillins and cephalosporins — destroying the antibiotic before it can inhibit cell wall synthesis." }
    ],
    quiz: [
      { id: "micro-q1", question: "Which is NOT one of Koch's Postulates?", options: ["Microbe found in all disease cases", "Microbe grown in pure culture", "Disease must be treatable with antibiotics", "Microbe re-isolated from experimental host"], correctIndex: 2 },
      { id: "micro-q2", question: "Antigenic shift in influenza occurs via:", options: ["Point mutations", "Reassortment of RNA segments", "DNA recombination", "Protein misfolding"], correctIndex: 1 },
      { id: "micro-q3", question: "Efflux pumps confer resistance by:", options: ["Destroying the antibiotic", "Pumping the drug out of the cell", "Modifying the drug target", "Preventing cell wall synthesis"], correctIndex: 1 },
      { id: "micro-q4", question: "MRSA resistance is due to:", options: ["Efflux pumps only", "The mecA gene encoding altered PBP2a", "Capsule production", "Biofilm formation"], correctIndex: 1 },
      { id: "micro-q5", question: "C. difficile spores are NOT killed by:", options: ["Bleach", "Autoclave", "Alcohol hand gel", "UV radiation"], correctIndex: 2 },
      { id: "micro-q6", question: "FMT has what cure rate for chronic C. difficile?", options: ["50%", "65%", "75%", "85%"], correctIndex: 3 },
      { id: "micro-q7", question: "Quorum sensing involves bacteria communicating via:", options: ["Direct cell contact", "Small signalling molecules (autoinducers)", "Electrical impulses", "Magnetic fields"], correctIndex: 1 },
      { id: "micro-q8", question: "The 2018 XDR gonorrhoea case was only susceptible to:", options: ["Azithromycin", "Ceftriaxone", "Spectinomycin", "Penicillin"], correctIndex: 2 },
      { id: "micro-q9", question: "Chlamydia is asymptomatic in what percentage of women?", options: ["10–20%", "30–40%", "50–60%", "70–80%"], correctIndex: 3 },
      { id: "micro-q10", question: "Syphilis diagnoses in England in 2023 were the highest since:", options: ["1918", "1948", "1978", "2000"], correctIndex: 1 },
      { id: "micro-q11", question: "Horizontal gene transfer in bacteria primarily occurs via:", options: ["Chromosomal inheritance", "Plasmid DNA", "Viral transduction only", "Mitosis"], correctIndex: 1 },
      { id: "micro-q12", question: "Which organism causes lung infections especially in CF patients and forms biofilms?", options: ["MRSA", "Pseudomonas aeruginosa", "E. coli", "C. difficile"], correctIndex: 1 }
    ]
  },

  // ─────────────────────────────────────────────
  // TOPIC 6 — Conservation Biology
  // ─────────────────────────────────────────────
  {
    id: "conservation-biology",
    name: "Conservation Biology",
    icon: "🌿",
    notes: [
      "**Three Levels of Biodiversity** — 1) Genetic diversity: variability of genes/alleles within a species (raw material for evolution). 2) Species diversity: variety and abundance of species in an area (richness + evenness). 3) Ecosystem diversity: variety of habitats in a region.",
      "**Measuring Species Diversity** — Species richness = number of species. Species evenness = relative abundance. Simpson's Index: probability two random individuals are different species. Shannon Index accounts for both richness and evenness.",
      "**Genetic Diversity Example** — Heliconius melpomene butterfly: huge phenotypic variation in wing patterns across geographic variants, controlled by surprisingly few genes. Different species in the same location resemble each other (Müllerian mimicry — all unpalatable to predators).",
      "**Biodiversity Net Gain (BNG)** — Part of the Environment Act (2021): most medium and large UK developments must measurably increase site biodiversity by 10%.",
      "**5 Main Drivers of Biodiversity Loss** — 1) Habitat loss/degradation (deforestation). 2) Pollution. 3) Climate change. 4) Overexploitation. 5) Invasive species.",
      "**Extinction Vortex** — Small populations enter positive feedback loops: inbreeding → reduced genetic variation → further population decline → more inbreeding. Loss of genetic variation is the key factor in extinction.",
      "**Vulnerable vs Resilient Species** — Most vulnerable: low population density, small range, specialised niche, low reproductive rate, endemic. Least vulnerable: high density, large range, generalised niche, high reproductive rate.",
      "**Case Study: Variable Harlequin Toad** — Atelopus varius: critically endangered. Threats: habitat destruction, climate change, chytrid fungal disease (Bd, Bsal). Likely only one wild population left in Panama. Manchester Museum has a captive breeding programme.",
      "**Conservation Hotspots** — Must have ≥1,500 endemic vascular plant species AND ≤30% original vegetation remaining. 36 hotspots worldwide, covering just 2.5% of land but supporting >50% of plant species as endemics and ~43% of vertebrate species as endemics.",
      "**Keystone Species** — Disproportionately important to the ecosystem; removing them drastically changes or destroys it. Example: Almendro tree in Costa Rica — 88% of Great Green Macaw nest sites are in this tree; many animals depend on its seeds.",
      "**Umbrella Species** — Conserving these indirectly protects many other species. Value tied to geographic range. Example: Great Green Macaw — protecting its Almendro forest habitat benefits the entire ecosystem.",
      "**Conservation Strategies** — Protected areas (national parks, marine reserves), ex-situ conservation (zoos, seed banks), captive breeding & reintroduction, habitat corridors, debt-for-nature swaps, ecosystem valuation, reducing human footprint, in-situ conservation (protecting patches with high genetic variability).",
      "**Native vs Invasive Species** — Native: co-evolved within the ecosystem. Non-native/alien: live outside native range due to human introduction; if they establish = naturalised. Invasive: alien species that spread and cause harm.",
      "**How Invasives Cause Harm** — Disease vectors (grey squirrels transmit squirrelpox to reds; signal crayfish transmit crayfish plague). Aggressive predators (American mink caused 95% decline of UK water voles; feral cats responsible for ~20 mammal extinctions in Australia). Economic damage (Japanese knotweed costs £250m/year; rabbits cause £170m crop losses).",
      "**UK 'Big Four' Victorian Introductions from Asia** — 1) Giant hogweed (phototoxic sap, severe burns). 2) Japanese knotweed (structural damage, herbicide legally required). 3) Himalayan balsam (dominates riverbanks, explosive seedpods, destabilises banks). 4) Rhododendron.",
      "**5 Concept Clusters: What Makes a Species Invasive? (Enders et al., 2020)** — 1) Trait: short generation times, many offspring (r-strategists), generalists. 2) Darwin's: empty niches, susceptible environments (e.g. islands). 3) Biotic interaction: escapes natural enemies. 4) Propagule: introduced in large numbers/often. 5) Resource availability: disturbed environments temporarily richer.",
      "**Management: Trapping & Killing** — Coypu eradicated from SE England 1960–1989 (no sightings since). Physical removal works but is labour-intensive.",
      "**Management: Chemical & Physical** — Glyphosate for Japanese knotweed; 'balsam bashing' for Himalayan balsam (effective short-term only, must be sustained).",
      "**Management: Biological Control** — Using natural enemies. Caution needed: cane toads (introduced to Australia 1935, devastated native reptiles and quolls); harlequin ladybug (introduced for aphid control, now one of the world's most invasive insects). Current research: knotweed psyllids, leaf-spot fungus as mycoherbicide.",
      "**Monitoring & Governance** — Great Britain Non-native Species Secretariat (NNSS); CABI Invasive Species Compendium; CITES (trade in endangered species); IUCN Red List (threat assessment); Kunming-Montreal Framework 2022 (30x30 target: protect 30% land and sea by 2030)."
    ],
    flashcards: [
      { id: "cons-1", front: "What are the three levels of biodiversity?", back: "1) Genetic: variation within a species (raw material for evolution). 2) Species: variety and abundance of species (richness + evenness). 3) Ecosystem: variety of habitats in a region." },
      { id: "cons-2", front: "What is the extinction vortex?", back: "A positive feedback loop: small population → inbreeding → reduced genetic variation → further decline → more inbreeding. Loss of genetic variation is the key factor driving extinction." },
      { id: "cons-3", front: "What defines a conservation hotspot?", back: "≥1,500 endemic vascular plant species AND ≤30% original vegetation remaining. 36 hotspots cover just 2.5% of Earth's land but hold >50% of endemic plant species." },
      { id: "cons-4", front: "What is the difference between a keystone and an umbrella species?", back: "Keystone: disproportionately important — removing it drastically changes the ecosystem (e.g. Almendro tree). Umbrella: conserving it indirectly protects many other species in the habitat (e.g. Great Green Macaw)." },
      { id: "cons-5", front: "What is Biodiversity Net Gain (BNG)?", back: "Part of the Environment Act 2021: most medium and large UK developments must measurably increase site biodiversity by 10%." },
      { id: "cons-6", front: "Name the UK 'Big Four' Victorian invasive introductions.", back: "1) Giant hogweed (phototoxic sap). 2) Japanese knotweed (structural damage, £250m/year). 3) Himalayan balsam (riverbank domination). 4) Rhododendron. All introduced from Asia." },
      { id: "cons-7", front: "What are the 5 concept clusters for invasiveness (Enders et al.)?", back: "1) Trait: r-strategists, generalists. 2) Darwin's: empty niches, susceptible environments. 3) Biotic interaction: escape natural enemies. 4) Propagule: large/frequent introductions. 5) Resource availability: disturbed environments." },
      { id: "cons-8", front: "How did the coypu eradication succeed?", back: "Systematic trapping and killing programme in SE England, 1960–1989. No sightings since. One of the few successful complete eradications of an invasive mammal." },
      { id: "cons-9", front: "Why is biological control risky? Give 2 examples of failures.", back: "Introduced species can become invasive themselves. 1) Cane toads (Australia, 1935) — devastated native reptiles and quolls. 2) Harlequin ladybug (Europe, for aphid control) — now one of the world's most invasive insects." },
      { id: "cons-10", front: "How do grey squirrels harm red squirrels?", back: "Grey squirrels outcompete reds for resources AND transmit squirrelpox virus, which is lethal to red squirrels but not to greys (who act as carriers)." },
      { id: "cons-11", front: "What is the 30x30 target?", back: "From the Kunming-Montreal Global Biodiversity Framework (2022): protect 30% of the world's land and 30% of oceans by 2030." },
      { id: "cons-12", front: "What characteristics make a species vulnerable to extinction?", back: "Low population density, restricted geographic range, specialised ecological niche, low reproductive rate, endemic (found only in one region)." },
      { id: "cons-13", front: "What is the Atelopus varius case study about?", back: "Variable harlequin toad: critically endangered by habitat destruction, climate change, and chytrid fungal disease. Likely only one population left in Panama. Manchester Museum has a captive breeding programme." },
      { id: "cons-14", front: "What is Müllerian mimicry?", back: "When multiple unpalatable species in the same location evolve similar warning colouration, reinforcing predator avoidance for all. Seen in Heliconius butterflies." }
    ],
    quiz: [
      { id: "cons-q1", question: "The extinction vortex is driven primarily by:", options: ["Habitat loss alone", "Loss of genetic variation", "Climate change alone", "Pollution"], correctIndex: 1 },
      { id: "cons-q2", question: "Conservation hotspots cover what percentage of Earth's land?", options: ["2.5%", "10%", "25%", "50%"], correctIndex: 0 },
      { id: "cons-q3", question: "A keystone species is one that:", options: ["Has the largest population", "Is disproportionately important to its ecosystem", "Is always a predator", "Is endemic to islands"], correctIndex: 1 },
      { id: "cons-q4", question: "Giant hogweed is dangerous because:", options: ["It absorbs all soil water", "Its sap causes severe burns (phototoxic)", "It's poisonous when eaten", "It attracts invasive insects"], correctIndex: 1 },
      { id: "cons-q5", question: "Biodiversity Net Gain requires UK developments to increase biodiversity by:", options: ["5%", "10%", "20%", "30%"], correctIndex: 1 },
      { id: "cons-q6", question: "Grey squirrels harm red squirrels through competition AND:", options: ["Habitat destruction", "Transmitting squirrelpox", "Predation", "Hybridisation"], correctIndex: 1 },
      { id: "cons-q7", question: "Cane toads were introduced to Australia to control:", options: ["Rabbits", "Aphids", "Cane beetles", "Rats"], correctIndex: 2 },
      { id: "cons-q8", question: "Japanese knotweed costs the UK approximately:", options: ["£10m/year", "£50m/year", "£250m/year", "£1bn/year"], correctIndex: 2 },
      { id: "cons-q9", question: "Which was successfully eradicated from SE England by 1989?", options: ["Grey squirrel", "Coypu", "American mink", "Signal crayfish"], correctIndex: 1 },
      { id: "cons-q10", question: "The Kunming-Montreal Framework targets protecting what percentage of land and sea?", options: ["10%", "20%", "30%", "50%"], correctIndex: 2 },
      { id: "cons-q11", question: "Müllerian mimicry involves:", options: ["Palatable species copying unpalatable ones", "Multiple unpalatable species evolving similar warning colours", "Predators disguising as prey", "Plants mimicking animals"], correctIndex: 1 },
      { id: "cons-q12", question: "The single biggest threat to global biodiversity is:", options: ["Climate change", "Pollution", "Habitat loss/degradation", "Invasive species"], correctIndex: 2 }
    ]
  }
];
