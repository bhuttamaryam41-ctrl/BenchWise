import { TroubleshootingIssue } from '../types';

export const TROUBLESHOOTING_ISSUES: TroubleshootingIssue[] = [
  {
    id: 'ts-pcr-01',
    title: 'No Target Amplification Band in PCR Gel',
    category: 'PCR & Electrophoresis',
    symptom: 'Agarose gel electrophoresis shows primer-dimer or clear lane with complete absence of predicted target amplicon band.',
    possibleCauses: [
      {
        cause: 'Suboptimal Annealing Temperature (Too High)',
        probability: '45%',
        fix: 'Perform a thermal gradient PCR (50°C - 65°C) to identify true optimal primer binding window.',
      },
      {
        cause: 'Degraded or Ineffective Polymerase / Incomplete Buffer Mixing',
        probability: '25%',
        fix: 'Verify enzyme was stored continuously at -20°C in non-frost-free freezer; replace buffer aliquot.',
      },
      {
        cause: 'PCR Inhibitors in Template DNA Extract (e.g. Ethanol, Polyphenols, Salts)',
        probability: '20%',
        fix: 'Dilute template DNA 1:10 or 1:50 in nuclease-free water to lower inhibitor concentration.',
      },
      {
        cause: 'Inappropriate Primer Concentration or Primer Sequence Mismatch',
        probability: '10%',
        fix: 'Re-verify primer sequence against target genome or order fresh primer synthesis.',
      },
    ],
    preventativeTips: [
      'Use fresh dNTP aliquots to prevent loss of nucleotide activity.',
      'Always quantify template DNA using a spectrophotometer (A260/280 ~ 1.8 for pure DNA).',
      'Include positive control DNA template with validated primers.',
    ],
  },
  {
    id: 'ts-pcr-02',
    title: 'High Non-Specific Priming & Smearing',
    category: 'PCR & Electrophoresis',
    symptom: 'Diffuse vertical smear along lane or multiple secondary non-target bands of varying lengths.',
    possibleCauses: [
      {
        cause: 'Annealing Temperature Set Too Low',
        probability: '40%',
        fix: 'Increase annealing temperature in 2°C increments or switch to Hot-Start Polymerase.',
      },
      {
        cause: 'Excessive Polymerase Enzyme Units or Cycle Count',
        probability: '30%',
        fix: 'Reduce cycle count from 35-40 down to 28-30 cycles; reduce polymerase input to 1 U per 50 µL rxn.',
      },
      {
        cause: 'High GC Content Region Secondary Structures',
        probability: '20%',
        fix: 'Add 3-5% DMSO or betaine (1M final) to relax secondary structures during denaturation.',
      },
      {
        cause: 'Overloaded Template Input',
        probability: '10%',
        fix: 'Use 1-10 ng plasmid or 50-100 ng genomic DNA max per 50 µL reaction.',
      },
    ],
    preventativeTips: [
      'Assemble reactions strictly on ice when using standard non-hot-start polymerases.',
      'Calculate Tm using SantaLucia 1998 nearest-neighbor thermodynamic parameters.',
    ],
  },
  {
    id: 'ts-wb-01',
    title: 'High Background Signal in Western Blot',
    category: 'Western Blotting',
    symptom: 'Membrane exhibits dark overall background or uniform dark blotches making specific target protein band unidentifiable.',
    possibleCauses: [
      {
        cause: 'Insufficient Membrane Blocking',
        probability: '50%',
        fix: 'Increase blocking duration to 1-2 hours at RT or switch blocking buffer from 5% Non-fat Milk to 5% BSA.',
      },
      {
        cause: 'Primary or Secondary Antibody Concentration Too High',
        probability: '30%',
        fix: 'Dilute primary antibody (e.g., from 1:1,000 to 1:5,000) and secondary HRP antibody (1:10,000).',
      },
      {
        cause: 'Inadequate Washing Steps between Antibody Incubations',
        probability: '15%',
        fix: 'Perform 4-5 washes for 5-10 minutes each with TBST (0.1% Tween-20) under vigorous agitation.',
      },
      {
        cause: 'Membrane Drying During Incubation',
        probability: '5%',
        fix: 'Ensure membrane remains fully submerged in liquid throughout all incubation steps.',
      },
    ],
    preventativeTips: [
      'Filter blocking solutions through 0.22 µm syringe filters to remove particulate aggregates.',
      'Use PVDF membrane with high protein binding capacity and thoroughly pre-wet in 100% Methanol.',
    ],
  },
  {
    id: 'ts-cell-01',
    title: 'Low Bacterial Transformation Efficiency',
    category: 'Cell Culture & Transformation',
    symptom: 'LB agar selection plates yield few or zero colony forming units (CFUs) following heat-shock or electroporation.',
    possibleCauses: [
      {
        cause: 'Loss of Competent Cell Viability (Freeze-Thaw Damage)',
        probability: '45%',
        fix: 'Thaw competent cells strictly on ice; never vortex or allow cells to warm above 4°C prior to heat shock.',
      },
      {
        cause: 'Incorrect Heat Shock Temperature or Incubation Duration',
        probability: '30%',
        fix: 'Verify water bath temperature with calibrated thermometer at exactly 42°C for 45 seconds (E. coli).',
      },
      {
        cause: 'Omission or Incomplete Outgrowth Recovery Period',
        probability: '15%',
        fix: 'Incubate transformed cells in SOC medium at 37°C with shaking for at least 60 minutes before plating.',
      },
      {
        cause: 'Antibiotic Selection Pressure Incorrect (Excessive Antibiotic)',
        probability: '10%',
        fix: 'Verify antibiotic plate preparation (Ampicillin 100 µg/mL, Kanamycin 50 µg/mL).',
      },
    ],
    preventativeTips: [
      'Include 10 pg control pUC19 DNA to test competent cell transformation efficiency (target >1x10^8 cfu/µg).',
      'Store competent cells in single-use aliquots at -80°C.',
    ],
  },
];
