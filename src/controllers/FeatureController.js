import { FeatureListService, LegalDetailsService } from "../services/FeaturesService.js";

export const FeatureListController = async (req, res) =>{
  const result = await FeatureListService(req);
  return res.status(200).json(result);
} ;

export const LegalDetailsController = async (req, res) =>{
  const result = await LegalDetailsService(req);
  return res.status(200).json(result);
} ;