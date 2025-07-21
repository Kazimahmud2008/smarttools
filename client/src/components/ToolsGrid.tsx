import { useState } from 'react';
import { tools, getCategories } from '@/lib/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ToolModal from './ToolModal';

export default function ToolsGrid() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleTools, setVisibleTools] = useState(12);

  const categories = getCategories();
  
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const displayedTools = filteredTools.slice(0, visibleTools);

  const handleLoadMore = () => {
    setVisibleTools(prev => prev + 12);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Choose Your <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Power Tool</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Streamline your workflow with our comprehensive collection of professional-grade online utilities
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedTools.map((tool) => (
            <div
              key={tool.id}
              className="tool-card glassmorphism rounded-xl p-6 hover:shadow-xl cursor-pointer"
              onClick={() => setSelectedTool(tool.id)}
            >
              <div className={`bg-gradient-to-r ${tool.gradient} p-3 rounded-lg w-fit mb-4`}>
                <i className={`${tool.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{tool.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        {visibleTools < filteredTools.length && (
          <div className="text-center mt-12">
            <Button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg"
              size="lg"
            >
              <i className="fas fa-plus mr-2"></i>
              Load More Tools ({filteredTools.length - visibleTools} remaining)
            </Button>
          </div>
        )}
        
        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-search text-4xl text-slate-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No tools found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Tool Modal */}
      <ToolModal
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        toolId={selectedTool}
      />
    </section>
  );
}
