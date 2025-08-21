'use client'
import React, { useState, useRef } from 'react';
import { 
  FileText, 
  StickyNote, 
  Quote, 
  Users, 
  ArrowLeft, 
  MoreVertical,
  Upload,
  Search,
  Tag,
  Bot,
  Plus,
  Bold,
  Italic,
  Underline,
  List,
  ChevronLeft,
  ChevronRight,
  Target,
  BookOpen,
  Lightbulb,
  CheckSquare,
  Calendar,
  Download,
  Share2,
  Brain,
  Map,
  Zap,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

export default function EnhancedResearchWorkspace() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('documents');
  const [projectPhase, setProjectPhase] = useState('planning'); // planning, research, writing, review
  const [documents, setDocuments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [blocks, setBlocks] = useState([
    { id: 1, type: 'heading', content: 'Introduction', level: 1 },
    { id: 2, type: 'text', content: 'Machine learning has emerged as a transformative technology in healthcare, offering unprecedented opportunities to improve diagnostic accuracy, treatment efficacy, and patient outcomes.' },
    { id: 3, type: 'text', content: '' }
  ]);
  const [activeBlock, setActiveBlock] = useState(null);
  const fileInputRef = useRef(null);

  // Mock data
  const mockProject = {
    id: '1',
    title: 'Machine Learning in Healthcare: A Systematic Review',
    type: 'Thesis',
    lastModified: '2 hours ago',
    progress: 35,
    deadline: '2024-12-15',
    phase: 'Research Phase'
  };

  const mockDocuments = [
    { id: 1, name: 'ML_Healthcare_2023.pdf', type: 'pdf', size: '2.1 MB', uploadDate: '2 days ago', status: 'analyzed', tags: ['machine-learning', 'healthcare'] },
    { id: 2, name: 'Deep_Learning_Medical.pdf', type: 'pdf', size: '1.8 MB', uploadDate: '3 days ago', status: 'pending', tags: ['deep-learning'] },
    { id: 3, name: 'AI_Diagnosis_Review.pdf', type: 'pdf', size: '3.2 MB', uploadDate: '1 week ago', status: 'analyzed', tags: ['AI', 'diagnosis'] },
  ];

  const mockSummaries = documents.filter(doc => doc.status === 'analyzed' && doc.summary);

  const mockProjectStructure = {
    sections: [
      { id: 1, title: 'Introduction', status: 'draft', wordCount: 245 },
      { id: 2, title: 'Literature Review', status: 'outline', wordCount: 0 },
      { id: 3, title: 'Methodology', status: 'not-started', wordCount: 0 },
      { id: 4, title: 'Results', status: 'not-started', wordCount: 0 },
      { id: 5, title: 'Discussion', status: 'not-started', wordCount: 0 },
      { id: 6, title: 'Conclusion', status: 'not-started', wordCount: 0 }
    ]
  };

  const mockTasks = [
    { id: 1, title: 'Review 5 more papers on ML diagnostics', priority: 'high', due: 'Today' },
    { id: 2, title: 'Draft methodology section', priority: 'medium', due: 'Tomorrow' },
    { id: 3, title: 'Create citation database', priority: 'low', due: 'This week' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'analyzed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'uploading': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      case 'outline': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'analyzed': return <CheckCircle className="w-3 h-3" />;
      case 'processing': return <Clock className="w-3 h-3" />;
      case 'uploading': return <Upload className="w-3 h-3" />;
      case 'error': return <AlertCircle className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  // File upload handlers
  const handleFileUpload = (files) => {
    Array.from(files).forEach((file) => {
      const newDoc = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size),
        uploadDate: 'just now',
        status: 'uploading',
        tags: [],
        file: file
      };

      setDocuments(prev => [newDoc, ...prev]);

      // Simulate upload and processing
      setTimeout(() => {
        setDocuments(prev => prev.map(doc => 
          doc.id === newDoc.id 
            ? { ...doc, status: 'processing' }
            : doc
        ));

        // Simulate processing completion
        setTimeout(() => {
          setDocuments(prev => prev.map(doc => 
            doc.id === newDoc.id 
              ? { 
                  ...doc, 
                  status: 'analyzed',
                  summary: 'AI analysis complete. Document has been processed and key insights extracted.',
                  keyPoints: ['Key finding 1', 'Key finding 2', 'Key finding 3'],
                  citation: `${file.name.replace('.pdf', '')}. (2024). Document Citation.`,
                  relevanceScore: Math.random() * 0.3 + 0.7 // Random score between 0.7-1.0
                }
              : doc
          ));
        }, 3000);
      }, 1000);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  // Block editing functions
  const updateBlock = (blockId, content) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, content } : block
    ));
  };

  const addBlock = (afterId, type = 'text') => {
    const newBlock = {
      id: Date.now(),
      type,
      content: '',
      level: type === 'heading' ? 2 : undefined
    };
    
    const afterIndex = blocks.findIndex(block => block.id === afterId);
    const newBlocks = [...blocks];
    newBlocks.splice(afterIndex + 1, 0, newBlock);
    setBlocks(newBlocks);
    setActiveBlock(newBlock.id);
  };

  const deleteBlock = (blockId) => {
    if (blocks.length > 1) {
      setBlocks(prev => prev.filter(block => block.id !== blockId));
    }
  };

  const handleBlockKeyDown = (e, blockId) => {
    // Remove Enter hijacking - let it work naturally for new lines
    if (e.key === 'Backspace' && e.target.value === '') {
      e.preventDefault();
      deleteBlock(blockId);
    }
  };

  const insertCitation = (citation) => {
    if (activeBlock) {
      const currentBlock = blocks.find(b => b.id === activeBlock);
      if (currentBlock) {
        updateBlock(activeBlock, currentBlock.content + ` ${citation}`);
      }
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="text-gray-600 w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">{mockProject.title}</h1>
              <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                <span className="flex items-center space-x-1">
                  <Target className="w-3 h-3" />
                  <span>{mockProject.phase}</span>
                </span>
                <span>•</span>
                <span>{mockProject.progress}% complete</span>
                <span>•</span>
                <span>Due {mockProject.deadline}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-4">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-slate-800 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${mockProject.progress}%` }}
              ></div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Export Project">
                <Download className="text-gray-600 w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Share Project">
                <Share2 className="text-gray-600 w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="AI Project Guide">
                <Brain className="text-gray-600 w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="text-gray-600 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Documents & Project Structure */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          isLeftPanelCollapsed ? 'w-12' : 'w-80'
        }`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isLeftPanelCollapsed && (
              <div className="flex space-x-1">
                <button 
                  onClick={() => setActiveTab('documents')}
                  className={`px-3 py-1 text-sm rounded ${
                    activeTab === 'documents' ? 'bg-slate-800 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Sources
                </button>
                <button 
                  onClick={() => setActiveTab('structure')}
                  className={`px-3 py-1 text-sm rounded ${
                    activeTab === 'structure' ? 'bg-slate-800 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Structure
                </button>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 text-sm rounded ${
                    activeTab === 'overview' ? 'bg-slate-800 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Overview
                </button>
              </div>
            )}
            <button 
              onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isLeftPanelCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
          
          {!isLeftPanelCollapsed && (
            <div className="flex-1 overflow-y-auto">
              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="p-4">
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* Enhanced Upload Area */}
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center transition-colors cursor-pointer ${
                      isDragging 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className={`mx-auto w-6 h-6 mb-2 ${
                      isDragging ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm mb-2 ${
                      isDragging ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {isDragging ? 'Drop files here' : 'Drop files here or click to upload'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>

                  {/* Enhanced Document List */}
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div 
                        key={doc.id}
                        onClick={() => setSelectedDocument(doc)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors relative group ${
                          selectedDocument?.id === doc.id 
                            ? 'border-slate-800 bg-slate-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <FileText className="text-gray-500 w-4 h-4 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-medium text-sm text-gray-800 truncate">{doc.name}</p>
                              <span className={`px-2 py-1 text-xs rounded flex items-center space-x-1 ${getStatusColor(doc.status)}`}>
                                {getStatusIcon(doc.status)}
                                <span>{doc.status}</span>
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{doc.size} • {doc.uploadDate}</p>
                            {doc.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {doc.tags.map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {doc.status === 'analyzed' && doc.relevanceScore && (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600 font-medium">
                                  {Math.round(doc.relevanceScore * 100)}% relevant
                                </span>
                                <button className="text-xs text-slate-600 hover:text-slate-800 flex items-center space-x-1">
                                  <Eye className="w-3 h-3" />
                                  <span>View Full</span>
                                </button>
                              </div>
                            )}
                            {doc.status === 'processing' && (
                              <div className="flex items-center space-x-2">
                                <div className="w-32 bg-gray-200 rounded-full h-1">
                                  <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                </div>
                                <span className="text-xs text-gray-500">Processing...</span>
                              </div>
                            )}
                          </div>
                          {/* Remove button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeDocument(doc.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                          >
                            <X className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Structure Tab */}
              {activeTab === 'structure' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-700">Project Outline</h4>
                    <button className="text-xs text-slate-800 hover:underline flex items-center space-x-1">
                      <Lightbulb className="w-3 h-3" />
                      <span>AI Suggest</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mockProjectStructure.sections.map((section) => (
                      <div 
                        key={section.id}
                        className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800">{section.title}</span>
                          <span className={`px-2 py-1 text-xs rounded ${getStatusColor(section.status)}`}>
                            {section.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {section.wordCount} words
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 p-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 transition-colors">
                    + Add Section
                  </button>
                </div>
              )}

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="p-4">
                  {/* Tasks */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <CheckSquare className="w-4 h-4 mr-2" />
                      Next Steps
                    </h4>
                    <div className="space-y-2">
                      {mockTasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                          <input type="checkbox" className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{task.title}</p>
                            <p className="text-xs text-gray-500">{task.due}</p>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${
                            task.priority === 'high' ? 'bg-red-400' : 
                            task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                          }`}></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-800">{documents.length}</div>
                      <div className="text-xs text-blue-600">Sources</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-800">{documents.filter(d => d.status === 'analyzed').length}</div>
                      <div className="text-xs text-green-600">Analyzed</div>
                    </div>
                  </div>

                  {/* AI Guidance */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-800">AI Guidance</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      You're making good progress! Consider focusing on the methodology section next.
                    </p>
                    <button className="text-xs text-slate-800 hover:underline">Get detailed plan →</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center Panel - Main Workspace */}
        <div className="flex-1 flex flex-col">
          {/* Writing Toolbar */}
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Underline className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Quote className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-slate-800 text-white rounded text-sm hover:bg-slate-900">
                    <Tag className="w-3 h-3" />
                    <span>Tag</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    <Bot className="w-3 h-3" />
                    <span>AI Assist</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Auto-saved 2 min ago</span>
              </div>
            </div>
          </div>

          {/* Main Writing Area - Block Editor */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <div 
                    key={block.id} 
                    className="group relative"
                    onFocus={() => setActiveBlock(block.id)}
                  >
                    {/* Block Controls */}
                    <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col space-y-1">
                        <button 
                          onClick={() => addBlock(block.id, 'text')}
                          className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
                          title="Add text block"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => addBlock(block.id, 'heading')}
                          className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
                          title="Add heading"
                        >
                          <span className="text-xs font-bold text-gray-600">H</span>
                        </button>
                        <button 
                          onClick={() => addBlock(block.id, 'quote')}
                          className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
                          title="Add quote"
                        >
                          <Quote className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Block Content */}
                    {block.type === 'heading' && (
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        onKeyDown={(e) => handleBlockKeyDown(e, block.id)}
                        className={`w-full font-bold text-gray-800 bg-transparent border-none outline-none resize-none ${
                          block.level === 1 ? 'text-3xl mb-4' : 'text-xl mb-2'
                        }`}
                        placeholder="Heading..."
                        onFocus={() => setActiveBlock(block.id)}
                      />
                    )}

                    {block.type === 'text' && (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        onKeyDown={(e) => handleBlockKeyDown(e, block.id)}
                        className="w-full text-gray-800 bg-transparent border-none outline-none resize-none leading-relaxed"
                        style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.8' }}
                        placeholder="Start writing..."
                        rows={block.content ? Math.max(2, block.content.split('\n').length) : 2}
                        onFocus={() => setActiveBlock(block.id)}
                      />
                    )}

                    {block.type === 'quote' && (
                      <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r">
                        <textarea
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, e.target.value)}
                          onKeyDown={(e) => handleBlockKeyDown(e, block.id)}
                          className="w-full text-gray-700 bg-transparent border-none outline-none resize-none italic"
                          style={{ fontFamily: 'Georgia, serif', fontSize: '15px' }}
                          placeholder="Insert quote or citation..."
                          rows={block.content ? Math.max(2, block.content.split('\n').length) : 2}
                          onFocus={() => setActiveBlock(block.id)}
                        />
                      </div>
                    )}

                    {/* Delete Button */}
                    {blocks.length > 1 && (
                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 w-6 h-6 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center transition-opacity"
                        title="Delete block"
                      >
                        <X className="w-3 h-3 text-red-600" />
                      </button>
                    )}

                    {/* Active Block Indicator */}
                    {activeBlock === block.id && (
                      <div className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-500 rounded"></div>
                    )}
                  </div>
                ))}

                {/* Add Block at End */}
                <div className="flex items-center space-x-2 pt-4">
                  <button 
                    onClick={() => addBlock(blocks[blocks.length - 1].id, 'text')}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add block</span>
                  </button>
                  <span className="text-gray-300">•</span>
                  <button 
                    onClick={() => addBlock(blocks[blocks.length - 1].id, 'heading')}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Heading
                  </button>
                  <button 
                    onClick={() => addBlock(blocks[blocks.length - 1].id, 'quote')}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Insights & Tools */}
        <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${
          isRightPanelCollapsed ? 'w-12' : 'w-80'
        }`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isRightPanelCollapsed && (
              <div className="flex space-x-1">
                <button className="px-3 py-1 text-sm rounded bg-slate-800 text-white">
                  Insights
                </button>
                <button className="px-3 py-1 text-sm rounded text-gray-600 hover:bg-gray-100">
                  Citations
                </button>
              </div>
            )}
            <button 
              onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isRightPanelCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
          
          {!isRightPanelCollapsed && (
            <div className="p-4 overflow-y-auto h-full">
              {/* AI Writing Assistant */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Writing Assistant</span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Your introduction looks strong! Consider adding more specific statistics to support your claims.
                </p>
                <button className="text-xs text-blue-800 hover:underline">Apply suggestion</button>
              </div>

              {/* Document Insights */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Document Insights
                </h4>
                {mockSummaries.length > 0 ? (
                  mockSummaries.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium text-gray-800 truncate">{doc.name}</h5>
                        <div className="flex items-center space-x-2">
                          {doc.relevanceScore && (
                            <span className="text-xs text-green-600 font-medium">
                              {Math.round(doc.relevanceScore * 100)}% relevant
                            </span>
                          )}
                          <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{doc.summary}</p>
                      {doc.keyPoints && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Key Points:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {doc.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start space-x-1">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button className="text-xs text-slate-800 hover:underline">Insert quote</button>
                        <button className="text-xs text-slate-800 hover:underline">Use data</button>
                        <button 
                          onClick={() => insertCitation(`(${doc.citation})`)}
                          className="text-xs text-slate-800 hover:underline"
                        >
                          Add citation
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No analyzed documents yet</p>
                    <p className="text-xs">Upload documents to see AI insights</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Generate outline</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">AI-powered section suggestions</p>
                </button>
                
                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Map className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Research gaps</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Identify missing information</p>
                </button>

                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Quote className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Auto-cite</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Generate citations from text</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}