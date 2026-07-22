import { ExperimentType, ReviewGoal, ProtocolReviewAnalysis } from '../types';

export const SAMPLE_PCR_TEXT = `1. Thaw 2X Taq Master Mix, primers (10 µM forward and reverse), and DNA template on ice.
2. In a sterile 0.2 mL PCR tube, combine the following reagents for a 50 µL reaction:
   - 2X Taq Master Mix: 25 µL
   - Forward Primer (10 µM): 2.5 µL (final conc. 0.5 µM)
   - Reverse Primer (10 µM): 2.5 µL (final conc. 0.5 µM)
   - DNA Template (50 ng/µL): 1.0 µL (50 ng total)
   - Nuclease-free water: 19.0 µL
3. Mix gently by pipetting up and down 5 times, then spin briefly in a microcentrifuge.
4. Place tubes in thermal cycler programmed with the following parameters:
   - Initial Denaturation: 95°C for 3 minutes
   - 35 Cycles:
     * Denaturation: 95°C for 30 seconds
     * Annealing: 58°C for 30 seconds
     * Extension: 72°C for 60 seconds (1 min/kb)
   - Final Extension: 72°C for 5 minutes
   - Hold: 4°C indefinitely
5. Run 5 µL of PCR product with 1 µL 6X Loading Dye on a 1.0% agarose gel in 1X TAE buffer at 100V for 45 minutes to verify amplification.`;

export const SAMPLE_WESTERN_TEXT = `1. Lyse cells in RIPA buffer supplemented with 1X protease and phosphatase inhibitor cocktail on ice for 30 minutes.
2. Centrifuge cell lysate at 14,000 x g for 15 minutes at 4°C; collect supernatant containing soluble proteins.
3. Quantify protein concentration using BCA protein assay against BSA standard curve.
4. Prepare 30 µg protein samples in 1X Laemmli sample buffer with 5% 2-mercaptoethanol. Denature at 95°C for 5 minutes.
5. Load samples onto 10% SDS-PAGE gel alongside prestained protein ladder.
6. Run gel in 1X Tris-Glycine-SDS running buffer at 90V through stacking gel, then 120V through resolving gel (~1.5 hours).
7. Transfer proteins to PVDF membrane (pre-wetted in methanol for 1 min) using wet transfer at 100V for 60 minutes at 4°C.
8. Block membrane in 5% non-fat dry milk in TBST for 1 hour at room temperature on an orbital shaker.
9. Incubate with primary antibody diluted 1:1,000 in 5% BSA/TBST overnight at 4°C with gentle agitation.
10. Wash membrane 3 x 10 minutes with TBST.
11. Incubate with HRP-conjugated secondary antibody (1:5,000 in 5% milk/TBST) for 1 hour at room temperature.
12. Wash 3 x 10 minutes with TBST. Apply ECL substrate and visualize chemiluminescence using digital imaging system.`;

export const SAMPLE_DNA_EXTRACTION_TEXT = `1. Resuspend bacterial cell pellet in 200 µL Resuspension Buffer with RNAse A.
2. Add 200 µL Lysis Buffer; invert tube gently 5 times to mix until solution becomes clear and viscous. Do not vortex.
3. Add 300 µL Neutralization Buffer; immediately invert tube 6 times. White precipitate will form.
4. Centrifuge at 13,000 x g for 10 minutes at room temperature.
5. Transfer clear lysate to silica column placed in collection tube.
6. Centrifuge column at 11,000 x g for 1 minute; discard flow-through.
7. Wash column with 500 µL Wash Buffer containing ethanol; centrifuge at 11,000 x g for 1 minute and discard flow-through.
8. Centrifuge column again at max speed for 2 minutes to dry silica matrix completely.
9. Transfer column to sterile 1.5 mL tube, add 50 µL pre-warmed (65°C) Elution Buffer (10 mM Tris-HCl, pH 8.5), incubate 2 min at room temperature, then centrifuge 1 min at 11,000 x g to elute purified DNA.`;

export function generateMockProtocolAnalysis(
  protocolText: string,
  expType: ExperimentType,
  goal: ReviewGoal
): ProtocolReviewAnalysis {
  const isPcr = expType === 'PCR' || expType === 'qPCR' || protocolText.toLowerCase().includes('pcr') || protocolText.toLowerCase().includes('cycler');
  const isWestern = expType === 'Western Blot' || protocolText.toLowerCase().includes('western') || protocolText.toLowerCase().includes('pvdf');
  const isDna = expType === 'DNA Extraction' || expType === 'RNA Extraction' || protocolText.toLowerCase().includes('extraction') || protocolText.toLowerCase().includes('elution');

  let qualityScore = 88;
  if (protocolText.length < 150) qualityScore = 62;
  else if (protocolText.length > 500) qualityScore = 92;

  let summary = `This ${expType} protocol outlines a structured experimental procedure. Key stoichiometry, temperature parameters, and incubation intervals have been verified for laboratory execution under GLP standard operating procedures.`;
  
  if (isPcr) {
    summary = `Comprehensive audit of the submitted ${expType} protocol indicates strong alignment with standard molecular biology protocols. The reaction master mix volumes (50 µL total) and thermocycling parameters (95°C denaturation, 58°C annealing) are appropriately scaled for standard Taq DNA polymerase amplification.`;
  } else if (isWestern) {
    summary = `Audit of the Western Blot protocol confirms appropriate protein quantification (30 µg input via BCA assay), denaturing SDS-PAGE parameters, PVDF membrane activation in methanol, and overnight primary antibody incubation at 4°C.`;
  } else if (isDna) {
    summary = `The silica spin-column nucleic acid extraction protocol demonstrates sound chemical buffer progression (Lysis &rarr; Neutralization &rarr; Wash &rarr; Elution). The dry-spin step effectively prevents residual ethanol contamination.`;
  }

  const potentialIssues = [
    {
      id: 'issue-1',
      title: 'Freeze-Thaw Enzyme & Buffer Degradation Risk',
      severity: 'Medium' as const,
      description: 'Enzymes and master mix solutions suffer activity loss if subjected to repeated freeze-thaw cycles.',
      recommendation: 'Prepare 50 µL single-use aliquots upon initial receipt to maintain enzymatic turnover rate.'
    },
    {
      id: 'issue-2',
      title: 'Annealing Temperature Optimization',
      severity: isPcr ? ('High' as const) : ('Low' as const),
      description: 'The specified annealing temperature (58°C) should be verified against primer Tm calculated via nearest-neighbor thermodynamics.',
      recommendation: 'Calculate exact primer Tm (Tm_primer - 3°C to 5°C) or perform a 52°C–62°C gradient PCR for new primer sets.'
    }
  ];

  if (goal === 'Safety Review' || goal === 'Check for Missing Steps') {
    potentialIssues.push({
      id: 'issue-3',
      title: 'Missing No-Template Control (NTC) / Extraction Blank',
      severity: 'High' as const,
      description: 'The procedure lacks a negative control sample to rule out reagent contamination or carryover.',
      recommendation: 'Always run a parallel negative control replacing template DNA/sample with nuclease-free water.'
    });
  }

  const missingInformation = [
    'Primer sequence Tm details or manufacturer product catalog/lot numbers.',
    'Centrifuge rotor radius (r.c.f. / x g vs. RPM conversion clarity).',
    'Specific pipette calibration check or aerosol-barrier barrier tip specification.'
  ];

  const suggestedImprovements = [
    'Pre-heat elution buffer or nuclease-free water to 65°C prior to final elution step to boost total yield by 15-25%.',
    'Include an initial 1-minute vortexing pause after buffer addition only if non-genomic DNA is target; use gentle inversion for high molecular weight DNA.',
    'Record exact bench room temperature and humidity for strict GLP notebook audit trails.'
  ];

  const safetyConsiderations = {
    bslLevel: (expType === 'Cell Culture' || expType === 'RNA Extraction' ? 'BSL-2' : 'BSL-1') as 'BSL-1' | 'BSL-2',
    ppeRequired: ['Lab coat', 'Nitrile gloves', 'Safety goggles / face shield', 'Closed-toe shoes'],
    hazards: isWestern 
      ? ['2-Mercaptoethanol (Toxic / Stench)', 'Methanol (Flammable / Toxic)', 'Acrylamide (Neurotoxin)']
      : isDna 
      ? ['Guanidine Hydrochloride / Isothiocyanate (Corrosive / Hazardous with bleach)', 'Ethanol (Flammable)']
      : ['Ethidium Bromide / Nucleic Acid Gel Stain (Mutagenic risk)', 'UV / Blue light exposure'],
    safetyNotes: [
      'Dispose of chemical waste and hazardous solvents in designated flammables and halogenated waste containers.',
      'Never mix guanidine-containing lysis buffers directly with bleach or strong oxidizers due to toxic gas release risk.',
      'Operate high-voltage electrophoresis apparatus with intact safety lids and dry bench surfaces.'
    ]
  };

  const bestPractices = [
    'Always use aerosol-barrier (filter) pipette tips when working with nucleic acids to prevent cross-contamination.',
    'Keep enzymes and master mixes on pre-chilled aluminum blocks or ice buckets throughout bench assembly.',
    'Maintain a dedicated clean room or PCR hood for master mix preparation isolated from post-amplification analysis areas.',
    'Label all tube caps and sides with indelible laboratory markers with experiment date, sample ID, and initials.'
  ];

  const finalRecommendation = isPcr
    ? 'APPROVED FOR BENCH EXECUTION with minor adjustment: Verify primer Tm via gradient PCR if target amplification efficiency falls below 90%.'
    : isWestern
    ? 'APPROVED WITH EXCELLENT GLP RIGOR: Ensure PVDF activation in methanol is maintained and blocking buffer matches antibody manufacturer recommendations.'
    : 'PASSED AUDIT: Protocol meets GLP benchmarks for reproducibility and safety. Proceed with experimental execution.';

  const words = protocolText.trim().split(/\s+/).filter(Boolean).length;
  const chars = protocolText.length;
  const now = new Date();

  return {
    protocolTitle: protocolText.split('\n')[0].replace(/^[0-9.#\-\s]+/, '').slice(0, 50) || `${expType} Custom Protocol`,
    experimentType: expType,
    reviewGoal: goal,
    qualityScore,
    confidenceLevel: '98% (Very High)',
    confidenceScore: 98,
    confidenceCategory: 'Very High',
    confidenceExplanation: 'The protocol contains sufficient detail for a reliable review. Confidence may decrease when essential experimental information is missing.',
    summary,
    potentialIssues,
    missingInformation,
    suggestedImprovements,
    safetyConsiderations,
    bestPractices,
    finalRecommendation,
    timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    reviewDate: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    wordCount: words,
    charCount: chars,
    status: 'Completed'
  };
}
